import {
	View,
	Text,
	Button,
	TextInput,
	FlatList,
} from "react-native";
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
					console.log("this list is empty");
				}
			} catch (error) {
				console.log("error getting list for this board", error);
			}
		};
		getBoardsLists();
	}, []);





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

				
			</View>
		</View>
	);
};

export default ListScreen;
