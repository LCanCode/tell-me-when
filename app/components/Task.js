import { View, Text, Button, TextInput, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { addDoc, collection, where, query, getDocs } from "firebase/firestore";


const Task = ({ listId, boardId }) => {
	const [listTasks, setListTasks] = useState([]);
  const [task, setTask] = useState({ title: "", time: 0 });
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
        if (listTasks.length == 0) {
					console.log("this tasks list is empty", listTasks.length);
				}
			} catch (error) {
				console.log("error getting task for ths list", error);
			}
		};
		getListsTasks();
	}, []);

  // to create a new tasks associate with a listId and boardId
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
			<View>
				<FlatList
					data={listTasks}
					renderItem={({ item }) => (
						<View>
							<Text>{item.title}</Text>
						</View>
					)}
				/>
				{/* <NewTask listId={listId} boardId={boardId} /> */}
			</View>
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
		</View>
	);
};

export default Task;
