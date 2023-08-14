import { View, Text, Button, TextInput, FlatList, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import {
	addDoc,
	collection,
	where,
	query,
	getDocs,
	Timestamp,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import ModalBox from "./ModalBox";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";

const Task = ({ listId, boardId }) => {
	const [listTasks, setListTasks] = useState([]);
	const [task, setTask] = useState({ title: "", time: 0 });
  const [modalVisible, setModalVisible] = useState(false);
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
					const { title, time, listId, boardId, dueDate, createdOn } =
						doc.data();
					listTasks.push({
						id: doc.id,
						title,
						time,
						listId,
						boardId,
						dueDate,
						createdOn,
					});
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
			const creationTimestamp = firebase.firestore.FieldValue.serverTimestamp();
			// const createdOnString = creationTimestamp.toDate()
			// const dueDated = new Date(task.dueDate);
			const dateParts = task.dueDate.split("-");
			const year = parseInt(dateParts[2], 10);
			let month = parseInt(dateParts[0], 10);
			const day = parseInt(dateParts[1], 10);

			month < 10 ? (month = "0" + month) : month;
			const agendaDate = year + "-" + month + "-" + day;

			await addDoc(listTasksCollection, {
				title: task.title,
				time: task.time,
				listId: listId,
				boardId: boardId,
				agendaDate: agendaDate,
				createdOn: creationTimestamp,
			});
			setListTasks(() => [
				...listTasks,
				{
					title: task.title,
					time: task.time,
					listId: listId,
					boardId: boardId,
					dueDate: task.dueDate,
					agendaDate: agendaDate,
					createdOn: creationTimestamp,
				},
			]);
			setTask({ title: "", time: "" });
			console.log("task created with list id", listId);
			console.log("listTask:", listTasks);
		} catch (error) {
			console.log("error creating task", error);
		}
	};

	// to delete a task
	const deleteTask = async (task) => {
		try {
			const taskToDelete = doc(FIRESTORE_DB, "tasks", task.id);
			await deleteDoc(taskToDelete);
			setListTasks(() => [...listTasks]);

			console.log("task deleted", task.id);
		} catch (error) {
			console.log("error deleting task", error);
		}
	};

	return (
		<View >
      <SafeAreaView>
			<View style={tw`p-2`}>
				<FlatList
					data={listTasks}
					renderItem={({ item }) => (
						<View style={tw` flex-column bg-zinc-300 border-white rounded-2xl border-2 h-30 w-50 p-10 mb-5`}>
							<Text style={tw`text-white text-center text-lg`}>{item.title}</Text>
							<Text style={tw`text-white text-center text-lg`}>{item.agendaDate}</Text>
						</View>
					)}
				/>
			</View>

			{/* button to create a new tasks */}
			<View style={tw`border-2 border-white bg-black`}>
				<Button
					style={tw`border-white border-2`}
					title="add new task"
					color="blue"
					onPress={() => {
						setModalVisible();
					}}
				/>
			</View>
			<View>
				<ModalBox
					isOpen={modalVisible}
					closeModal={() => setModalVisible(false)}
					title="Create New Board"
					description="Please enter task details."
					content={
						<>
							<TextInput
								placeholder="New Task Title"
								onChangeText={(text) => setTask({ ...task, title: text })}
								value={task.title}
							/>
							<TextInput
								placeholder="time it takes for this task"
								onChangeText={(text) => setTask({ ...task, time: text })}
								value={task.time}
							/>
							<TextInput
								placeholder="When is this task due? mm-dd-yyyy format"
								onChangeText={(text) => setTask({ ...task, dueDate: text })}
								value={task.dueDate}
							/>
							<Pressable
								onPress={() => { newTask(); setModalVisible(false);}}
								>
                  <Text> Add Task </Text>
                </Pressable>
							
						</>
					}
				/>
			</View>
      </SafeAreaView>
		</View>
	);
};

export default Task;
