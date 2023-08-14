import {
	View,
	Text,
	TextInput,
	FlatList,
	Pressable,
	SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import {
	addDoc,
	collection,
	where,
	query,
	getDocs,
	deleteDoc,
	doc,
} from "firebase/firestore";
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

	// to delete a list & tasks for that list
	const deleteList = async (listId) => {
		try {
			const tasksCollection = collection(FIRESTORE_DB, "tasks");
			const q = query(tasksCollection, where("listId", "==", listId));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach(async (doc) => {
				await deleteDoc(doc.ref);
			});
			console.log("task on list", listId, "deleted");

			const listToDelete = doc(FIRESTORE_DB, "list", listId);
			await deleteDoc(listToDelete);
			setUsersLists(usersLists.filter((list) => list.id !== listId));
			console.log("list deleted", listId);
		} catch (error) {
			console.log("error deleting list or tasks on list", error);
		}
	};

	return (
		<View>
			<SafeAreaView>
				{/* button to create a new list */}
				<View
					style={tw`text-center flex-wrap items-center flex-column gap-1 opacity-70 ml-4`}
				>
					<View
						style={tw`border-2 bg-white p-1 rounded-3xl h-10 flex-row justify-between items-center`}
					>
						<Pressable
							onPress={() => {
								setModalVisible();
							}}
						>
							<Text style={tw`text-xs text-blue-900`}> Add New List</Text>
						</Pressable>
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
				<View style={tw`items-center my-1`}>
					<View style={tw`w-96 items-center justify-center m-1`}>
						<FlatList
							horizontal={true}
							data={usersLists}
							renderItem={({ item }) => (
								<View style={tw`p-1`}>
									<View style={tw`h-120 border-white items-center m-1`}>
										<View style={tw`bg-gray-200 w-72 p-4 rounded shadow`}>
											<Text style={tw`text-black text-center text-lg`}>
												List Title: {item.title}
											</Text>
											<Text style={tw`text-black text-center text-xs`}>
												List Id = {item.id}
											</Text>
											<View style={tw`container items-center `}>
												<Pressable
													style={tw`p-1 border-2 border-white rounded-lg  
                          w-20 bg-gray-200 h-10 justify-between items-center`}
													onPress={() => {
														deleteList(item.id);
													}}
												>
													<Text style={tw`text-xs text-blue-900 pt-1`}>
														{" "}
														Delete List
													</Text>
												</Pressable>
											</View>

											<View style={tw``}>
												<Task
													listId={item.id}
													boardId={item.boardId}
													agendaDate={item.agendaDate}
												/>
											</View>
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
