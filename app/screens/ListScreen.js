import {
	View,
	Text,
	TextInput,
	FlatList,
	Pressable,
	SafeAreaView,
	KeyboardAvoidingView,
	ScrollView,
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
	setDoc,
} from "firebase/firestore";
import Task from "../components/Task";
import ModalBox from "../components/ModalBox";
import tw from "twrnc";
import { FontAwesome } from "@expo/vector-icons";

const ListScreen = ({ boardId }) => {
	const [list, setList] = useState({ title: "", description: "" });
	const [usersLists, setUsersLists] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [isUpdatingList, setIsUpdatingList] = useState(false);
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
	const newList = async () => {
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

	//updat a list title and description
	const updateList = async (listId) => {
		try {
			const userId = auth.currentUser.uid;
			const listToUpdate = doc(FIRESTORE_DB, "list", listId);
			await setDoc(
				listToUpdate,
				{
					title: list.title,
					description: list.description,
					boardId: boardId,
					userId: userId,
				},
				{ merge: true }
			);
			const updatedListIndex = usersLists.findIndex(
				(list) => list.id === listId
			);
			if (updatedListIndex !== -1) {
				const updatedLists = [...usersLists];
				updatedLists[updatedListIndex] = {
					...updatedLists[updatedListIndex],
					title: list.title,
					description: list.description,
				};
				setUsersLists(updatedLists);
			}
			setList({ title: "", description: "" });
			setModalVisible(false);

			console.log("list", listId, "updated with board id", boardId);
		} catch (error) {
			console.log("error updating list", error);
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
			<KeyboardAvoidingView>
				{/* button to create a new list */}
				<View style={tw`p-1 m-1 h-10 items-end justify-end`}>
					<Pressable
						onPress={() => {
							setModalVisible();
						}}
						style={tw`flex-row justify-center items-center w-35 h-10 border-2 border-cyan-700 rounded-lg bg-orange-200`}
					>
						<FontAwesome
							name="plus-square"
							size={30}
							color="white"
							onPress={() => setModalVisible()}
						/>

						<Text style={tw`text-cyan-700 font-bold tracking-wider text-base`}>
							{" "}
							New List
						</Text>
					</Pressable>
				</View>
				<View>
					<ModalBox
						isOpen={modalVisible}
						closeModal={() => {
							setModalVisible(false);
							setIsUpdatingList(false);
						}}
						title={isUpdatingList ? "Update List" : "Create New List"}
						description={
							isUpdatingList
								? "Please update all fields"
								: "Please enter list details."
						}
						content={
							<>
								<View style={tw`flex-column pb-10`}>
									<TextInput
										placeholder="New List Title"
										style={tw`font-black`}
										onChangeText={(text) => setList({ ...list, title: text })}
										value={list.title}
									/>
								</View>

								<View style={tw`flex-column py-10`}>
									<TextInput
										placeholder="New List Description"
										style={tw`font-black`}
										onChangeText={(text) =>
											setList({ ...list, description: text })
										}
										value={list.description}
									/>
								</View>
								<Pressable
									onPress={() => {
										if (isUpdatingList) {
											updateList(isUpdatingList);
										} else {
											newList();
										}
										setModalVisible(false);
									}}
									disabled={list.title === ""}
								>
									<Text style={tw`mt-6`}>
										{" "}
										{isUpdatingList ? "Update List" : "Add List"}{" "}
									</Text>
								</Pressable>
							</>
						}
					/>
				</View>
				{/* render all list  */}
				<ScrollView style={tw`flex `}>
					<View style={tw`w-100 h-140 `}>
						<FlatList
							horizontal={true}
							data={usersLists}
							renderItem={({ item }) => (
								<View style={tw``}>
									<View style={tw` `}>

										<View>
											<View style={tw` w-72 h-10 p-1 m-3 w-70 rounded shadow bg-orange-200 flex-row justify-around border-2 border-cyan-700`}>
												<Text style={tw`text-cyan-700 font-extrabold tracking-wider text-left text-lg pl-2`}>
													{item.title}
												</Text>

												<Pressable
													onPress={() => {
														setIsUpdatingList(item.id);
														setModalVisible(true);
													}}
												>
													<FontAwesome name="edit" size={24} color="white" />
												</Pressable>

												<Pressable
													style={tw``}
													onPress={() => {
														deleteList(item.id);
													}}
												>
                          <FontAwesome name="trash-o" size={24} color="white" />
												</Pressable>

											</View>


											<ScrollView>
												<View style={tw``}>
													<Task
														listId={item.id}
														boardId={item.boardId}
														agendaDate={item.agendaDate}
													/>
												</View>
											</ScrollView>
										</View>
									</View>
								</View>
							)}
						/>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
};

export default ListScreen;
