import { View, TextInput, Button } from "react-native";
import React from "react";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";

const NewTask = ({ listId, boardId }) => {
	const [task, setTask] = useState({ title: "", time: "" });
	const [listTasks, setListTasks] = useState([]);

	// to create a new tasks associate with a listId
	const newTask = async () => {
		try {
			const listTasksCollection = collection(FIRESTORE_DB, "tasks");
			await addDoc(listTasksCollection, {
				title: task.title,
				time: task.time,
				listId: listId,
				boardId: boardId,
			});
			setListTasks(() => [
				...listTasks,
				{
					title: task.title,
					time: task.time,
					listId: listId,
					boardId: boardId,
				},
			]);
			setTask({ title: "", time: "" });
			console.log("task created with list id", listId);
		} catch (error) {
			console.log("error creating task", error);
		}
	};
	return (
		<View>
			{/* button to create a new tasks */}
			<TextInput
				// style={styles.input}
				placeholder="New Task Title"
				onChangeText={(text) => setTask({ ...task, title: text })}
				value={task.title}
			/>
			<TextInput
				// style={styles.input}
				placeholder="time it takes for this task"
				onChangeText={(text) => setTask({ ...task, time: text })}
				value={task.time}
			/>
			<Button
				onPress={() => newTask()}
				title="Create Task"
				disabled={task.titlle === ""}
			/>
		</View>
	);
};

export default NewTask;
