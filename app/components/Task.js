import {
	View,
	Text,
	Button,
	TextInput,
	FlatList,
	Pressable,
	KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import {
	addDoc,
	collection,
	where,
	query,
	getDocs,
	Timestamp,
	deleteDoc,
	doc,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import ModalBox from "./ModalBox";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePickerModal from "./DatePickerModal";

const Task = ({ listId, boardId, agendaDate }) => {
	const [listTasks, setListTasks] = useState([]);
	const [task, setTask] = useState({
		dueDate: new Date(),
		startDate: new Date(),
	});
	const [modalVisible, setModalVisible] = useState(false);
	const [date, setDate] = useState(new Date());
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
					const {
						title,
						time,
						listId,
						boardId,
						dueDate,
						createdOn,
						startDate,
						agendaDueDate,
					} = doc.data();
					listTasks.push({
						id: doc.id,
						title,
						time,
						listId,
						boardId,
						dueDate,
						createdOn,
						startDate,
						agendaDueDate,
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

			const timestampDue = new Date(task.dueDate);
			const year = timestampDue.getFullYear();
			let month = String(timestampDue.getMonth() + 1).padStart(2, "0");
			const day = String(timestampDue.getDate()).padStart(2, "0");
			const agendaDate = year + "-" + month + "-" + day;

			await addDoc(listTasksCollection, {
				title: task.title,
				time: task.time,
				listId: listId,
				boardId: boardId,
				dueDate: task.dueDate,
				agendaDueDate: agendaDate,
				createdOn: creationTimestamp,
				startDate: task.startDate,
			});
			setListTasks(() => [
				...listTasks,
				{
					title: task.title,
					time: task.time,
					listId: listId,
					boardId: boardId,
					dueDate: task.dueDate,
					agendaDueDate: agendaDate,
					createdOn: creationTimestamp,
					startDate: task.startDate,
				},
			]);
			setTask({
				title: "",
				time: "",
				dueDate: new Date(),
				startDate: new Date(),
			});
			console.log("task created with list id", listId);
			console.log("listTask:", listTasks);
		} catch (error) {
			console.log("error creating task", error);
		}
	};

	// to delete a task
	const deleteTask = async (taskId) => {
		try {
			const taskToDelete = doc(FIRESTORE_DB, "tasks", taskId);
			await deleteDoc(taskToDelete);
			setListTasks(listTasks.filter((task) => task.id !== taskId));

			console.log("task deleted", taskId);
		} catch (error) {
			console.log("error deleting task", error);
		}
	};

	return (
		<View style={tw`p-1`}>
			<KeyboardAvoidingView>
				{/* button to create a new tasks */}
				<View
					style={tw`text-center flex-row items-center justify-center flex-column gap-1 opacity-70 pb-3`}
				>
					<View
						style={tw`border-2 border-white rounded-lg items  bg-gray-300 `}
					>
						<Pressable
							onPress={() => {
								setModalVisible();
							}}
						>
							<Text style={tw`text-xs text-blue-900`}> Add New Task </Text>
						</Pressable>
					</View>
					<View>
						<ModalBox
							isOpen={modalVisible}
							closeModal={() => setModalVisible(false)}
							title="Add New Task"
							description="Please enter task details."
							content={
								<>
									<View style={tw`flex-column pb-5`}>
										<TextInput
											placeholder="New Task Title"
											onChangeText={(text) => setTask({ ...task, title: text })}
											value={task.title}
										/>
									</View>

									<View style={tw`flex-column pb-5`}>
										<TextInput
											placeholder="Estimate of how long this task will take "
											onChangeText={(text) => setTask({ ...task, time: text })}
											value={task.time}
										/>
									</View>

									<View style={tw`flex-column pb-5`}>
										<Text>When will you start? </Text>
										<DatePickerModal
											onDateSelected={(date) =>
												setTask({ ...task, startDate: date })
											}
										/>
									</View>
									<View style={tw`flex-column pb-5`}>
										<Text>When is this task due? </Text>
										<DatePickerModal
											onDateSelected={(date) =>
												setTask({ ...task, dueDate: date })
											}
										/>
									</View>

									<Pressable
										onPress={() => {
											newTask();
											setModalVisible(false);
										}}
										disabled={task.title === ""}
									>
										<Text> Add Task </Text>
									</Pressable>
								</>
							}
						/>
					</View>
				</View>
				<View style={tw`p-2 `}>
					<FlatList
						data={listTasks}
						renderItem={({ item }) => (
							<View style={tw`bg-white rounded shadow p-3 mb-2`}>
								<Text style={tw`text-black text-center text-md`}>
									{item.title}
								</Text>
								<Text style={tw`text-black text-center text-xs`}>
									{item.agendaDueDate}
								</Text>
								<View style={tw`container items-center `}>
									<Pressable
										style={tw`p-1 border-2 border-white rounded-lg  w-1/2 bg-gray-200 h-10 justify-between items-center`}
										onPress={() => {
											deleteTask(item.id);
										}}
									>
										<Text style={tw`text-xs text-blue-900 p-2`}>
											{" "}
											Delete Task
										</Text>
									</Pressable>
								</View>
							</View>
						)}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default Task;
