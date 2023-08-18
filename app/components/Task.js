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
	setDoc,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import ModalBox from "./ModalBox";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePickerModal from "./DatePickerModal";
import { FontAwesome } from "@expo/vector-icons";

const Task = ({ listId, boardId, agendaDate }) => {
	const [listTasks, setListTasks] = useState([]);
	const [task, setTask] = useState({
		dueDate: new Date(),
		startDate: new Date(),
	});
	const [modalVisible, setModalVisible] = useState(false);
	const [date, setDate] = useState(new Date());
	const [isUpdatingTask, setIsUpdatingTask] = useState(false);
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

	//to update Task info

	const updateTask = async (taskId) => {
		try {
			const creationTimestamp = firebase.firestore.FieldValue.serverTimestamp();
			const timestampDue = new Date(task.dueDate);
			const year = timestampDue.getFullYear();
			let month = String(timestampDue.getMonth() + 1).padStart(2, "0");
			const day = String(timestampDue.getDate()).padStart(2, "0");
			const agendaDate = year + "-" + month + "-" + day;
			const tasktoUpdate = doc(FIRESTORE_DB, "tasks", taskId);
			await setDoc(
				tasktoUpdate,
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
				{ merge: true }
			);
			const updatedTaskIndex = listTasks.findIndex(
				(task) => task.id === taskId
			);
			if (updatedTaskIndex !== -1) {
				const updatedTasks = [...listTasks];
				updatedTasks[updatedTaskIndex] = {
					...updatedTasks[updatedTaskIndex],
					title: task.title,
					time: task.time,
					listId: listId,
					boardId: boardId,
					dueDate: task.dueDate,
					agendaDueDate: agendaDate,
					createdOn: creationTimestamp,
					startDate: task.startDate,
				};
				setListTasks(updatedTasks);
			}
			setTask({
				title: "",
				time: "",
				dueDate: new Date(),
				startDate: new Date(),
			});
			setModalVisible(false);
			console.log("task", taskId, "with list id", listId, "created");
			console.log("listTask:", listTasks);
		} catch (error) {
			console.log("error updating task", error);
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
					style={tw`text-center flex-row items-center justify-center flex-column gap-1  pb-3`}
				>
					<View
						style={tw`border-2 border-cyan-700 rounded-lg items  bg-orange-200 `}
					>
						<Pressable
							onPress={() => {
								setModalVisible();
							}}
							style={tw`flex-row justify-center items-center h-8 w-35`}
						>
							<Text style={tw`text-xs font-bold text-cyan-700`}>
								{" "}
								New Task{" "}
							</Text>
							<FontAwesome
								name="plus-square"
								size={30}
								color="white"
								onPress={() => setModalVisible()}
							/>
						</Pressable>
					</View>
					<View>
						<ModalBox
							isOpen={modalVisible}
							closeModal={() => {
								setModalVisible(false);
								setIsUpdatingTask(false);
							}}
							title={isUpdatingTask ? "Update Task" : "Add New Task"}
							description={
								isUpdatingTask
									? "Please update all fields"
									: "Please enter task details."
							}
							content={
								<>
									<View style={tw`flex-column pb-5`}>
										<TextInput
											placeholder="New Task Title"
											style={tw`font-black`}
											onChangeText={(text) => setTask({ ...task, title: text })}
											value={task.title}
										/>
									</View>

									<View style={tw`flex-column pb-5`}>
										<TextInput
											placeholder="Estimate of how long this task will take "
											style={tw`font-black`}
											onChangeText={(text) => setTask({ ...task, time: text })}
											value={task.time}
										/>
									</View>

									<View style={tw`flex-column pb-5`}>
										<Text style={tw`font-black`}>When will you start? </Text>
										<DatePickerModal
											onDateSelected={(date) =>
												setTask({ ...task, startDate: date })
											}
										/>
									</View>
									<View style={tw`flex-column pb-5`}>
										<Text style={tw`font-black`}>When is this task due? </Text>
										<DatePickerModal
											onDateSelected={(date) =>
												setTask({ ...task, dueDate: date })
											}
										/>
									</View>

									<Pressable
										onPress={() => {
											if (isUpdatingTask) {
												updateTask(isUpdatingTask);
											} else {
												newTask();
											}
											setModalVisible(false);
										}}
										disabled={task.title === ""}
									>
										<Text> {isUpdatingTask ? "Update Task" : "Add Task"} </Text>
									</Pressable>
								</>
							}
						/>
					</View>
				</View>
				<View style={tw`p-2 items-center`}>
					<FlatList
						data={listTasks}
						renderItem={({ item }) => (
							<View
								style={tw`bg-orange-200 m-2 border-2 
                border-cyan-700 rounded-lg w-60 `}
							>
								<View style={tw`flex-col items-center justify-center p-1`}>
									<Text
										style={tw`text-cyan-700 text-center text-xl 
                    self-center justify-center`}
									>
										{item.title}
									</Text>
									<Text style={tw`text-cyan-700 text-center
                  text-xs`}>
										due: {item.agendaDueDate}
									</Text>
								</View>

								<View style={tw`flex-row justify-between p-3`}>
									
									<Pressable
										onPress={() => {
											setIsUpdatingTask(item.id);
											setModalVisible(true);
										}}
									>
										<FontAwesome name="edit" size={24} color="white" />
									</Pressable>
									<Pressable
										style={tw``}
										onPress={() => {
                      deleteTask(item.id);
										}}
									>
                  <FontAwesome name="trash-o" size={24} color="white" />
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
