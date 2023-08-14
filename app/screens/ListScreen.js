import {
	View,
	Text,
	Button,
	TextInput,
	FlatList,
	Pressable,
	SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { addDoc, collection, where, query, getDocs } from "firebase/firestore";
import Task from "../components/Task";
import ModalBox from "../components/ModalBox";
import tw from "twrnc";

const ListScreen = ({ boardId }) => {
	const [list, setList] = useState({ title: "", description: "" });
	const [usersLists, setUsersLists] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const auth = FIREBASE_AUTH;

	// get all list associated with a boardId
	useEffect(() => {
		const getBoardsLists = async () => {
			try {
				const userId = auth.currentUser.uid;
				const boardListCollection = collection(FIRESTORE_DB, "list");
				const q = query(boardListCollection, where("boardId", "==", boardId));
				const querySnapshot = await getDocs(q);

				const usersLists = [];
				querySnapshot.forEach((doc) => {
					const { title, description, boardId, userId } = doc.data();
					usersLists.push({ id: doc.id, title, description, boardId, userId });
				});
				setUsersLists(usersLists);
				console.log("user list on this board", usersLists);
				if (usersLists.length == 0) {
					console.log("this user list is empty");
				}
			} catch (error) {
				console.log("error getting list for this board", error);
			}
		};
		getBoardsLists();
	}, []);

	// create a new list associated with a boardId
	const addList = async () => {
		try {
			const userId = auth.currentUser.uid;
			const userListCollection = collection(FIRESTORE_DB, "list");
			await addDoc(userListCollection, {
				title: list.title,
				description: list.description,
				boardId: boardId,
				userId: userId,
			});
			setUsersLists(() => [
				...usersLists,
				{
					title: list.title,
					description: list.description,
					boardId: boardId,
					userId: userId,
				},
			]);
			setList({ title: "", description: "" });
			console.log("list created with board id", boardId);
		} catch (error) {
			console.log("error creating list", error);
		}
	};

	return (
		<View>
			<SafeAreaView>
				{/* button to create a new list */}
				<View style={tw`text-center flex-wrap items-center flex-column gap-1 opacity-70`}>
          <View style={tw`border-2 border-white items-end`}>
          <Button
						title="add new list"
						color="blue"
						onPress={() => {
							setModalVisible();
						}}
					/>
				</View>
				</View>
				<View>
					<ModalBox
						isOpen={modalVisible}
						closeModal={() => setModalVisible(false)}
						title="Create New List"
						description="Please enter list details."
						content={
							<>
								<TextInput
									placeholder="New List Title"
									onChangeText={(text) => setList({ ...list, title: text })}
									value={list.title}
								/>
								<TextInput
									placeholder="New List Description"
									onChangeText={(text) =>
										setList({ ...list, description: text })
									}
									value={list.description}
								/>
								<Pressable
									onPress={() => {
										addList();
										setModalVisible(false);
									}}
								>
									<Text> Add List </Text>
								</Pressable>
							</>
						}
					/>
				</View>
					{/* render all list  */}
				<View style={tw`flex-row items-center my-3`}>
        <View
						style={tw`flex-column pt-1 opacity-90 w-96 items-center justify-center`}
					>
					<FlatList
						horizontal={true}
						data={usersLists}
						renderItem={({ item }) => (
              <View style={tw`p-2 `}>
							<View style={tw`h-120 bg-neutral-600 rounded-md border-2 border-white p-5 items-center`}>
								<Text style={tw`text-white text-center text-lg`}>
									{item.title}
								</Text>
								<Text style={tw`text-white text-center text-xs`}>
									List Id = {item.id}
								</Text>
                <View style={tw``}>
								<Task listId={item.id} boardId={item.boardId} />
							</View>
							</View>
							</View>
						)}
					/>
				</View>
				</View>
			</SafeAreaView>
		</View>
	);
};

export default ListScreen;
