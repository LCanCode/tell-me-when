import { View, Text, Button, TextInput, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { addDoc, collection, where, query, getDocs } from "firebase/firestore";
import NewTask from "./NewTask";

const Task = ({ listId, boardId }) => {
	const [listTasks, setListTasks] = useState([]);
	const auth = FIREBASE_AUTH;

	// get all tasks associated with a listId
	useEffect(() => {
		const getListsTasks = async () => {
			try {
				const listTasksCollection = collection(FIRESTORE_DB, "tasks");
				const q = query(listTasksCollection, where("listId", "==", listId));
				const querySnapshot = await getDocs(q);

				const listTasks = [];
				querySnapshot.forEach((doc) => {
					const { title, time, listId, boardId } = doc.data();
					listTasks.push({ id: doc.id, title, time, listId, boardId });
				});
				setListTasks(listTasks);
				console.log("user tasks on this list", listTasks);
			} catch (error) {
				console.log("error getting task for ths list", error);
			}
		};
		getListsTasks();
	}, []);

	return (
		<View>
			<View>
				<FlatList
					data={listTasks}
					renderItem={({ item }) => (
						<View>
							<Text>{item.title}</Text>
						</View>
					)}
				/>
				<NewTask listId={listId} boardId={boardId} />
			</View>
		</View>
	);
};

export default Task;
