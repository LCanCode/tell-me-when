import { View, Text, Button, TextInput, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { addDoc, collection, where, query, getDocs } from "firebase/firestore";
import Task from "../components/Task";

const ListScreen = ({ boardId }) => {
	const [list, setList] = useState({ title: "", description: "" });
	const [usersLists, setUsersLists] = useState([]);
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
			<View>
				{/* render all list  */}
				<FlatList
					data={usersLists}
					renderItem={({ item }) => (
						<View>
							<Text>{item.title}</Text>
							<Task listId={item.id} boardId={item.boardId} />
						</View>
					)}
				/>
				<View>
					{/* button to create a new list */}
					<TextInput
						// style={styles.input}
						placeholder="New List Title"
						onChangeText={(text) => setList({ ...list, title: text })}
						value={list.title}
					/>
					<TextInput
						// style={styles.input}
						placeholder="New List Description"
						onChangeText={(text) => setList({ ...list, description: text })}
						value={list.description}
					/>
					<Button
						onPress={() => addList()}
						title="Create List"
						disabled={list.title === ""}
					/>
				</View>
			</View>
		</View>
	);
};

export default ListScreen;
