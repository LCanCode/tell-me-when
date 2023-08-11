import { View, Text, FlatList } from "react-native";
import { Calendar, Agenda } from "react-native-calendars";
import React, { useState, useEffect } from "react";
import { addDoc, collection, where, query, getDocs } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";

const CalendarRN = () => {
	const [tasksList, setTasksList] = useState([]);
	const [agendaList, setAgendaList] = useState([]);

	const tasks = {
		"2023-08-09": [{ title: "one" }],
	};

	useEffect(() => {
		const getTasksForAgenda = async () => {
			try {
				const listTasksCollection = collection(FIRESTORE_DB, "tasks");
				const q = query(listTasksCollection);
				const querySnapshot = await getDocs(q);

				const tasksList = [];
				querySnapshot.forEach((doc) => {
					const { title, time, listId, boardId, dueDate, createdOn } =
						doc.data();
					tasksList.push({
						// id: doc.id,
						title,
						time,
						listId,
						boardId,
						dueDate,
						createdOn,
					});
				});
				setTasksList(tasksList);
				console.log("user tasks for the Agenda", tasksList);
				// console.log("dueDate");
			} catch (error) {
				console.log("error getting task list for ths agenda", dueDate, error);
			}
		};
		getTasksForAgenda();
	}, []);

	return (
		<View>
			{/* <View> */}
			{/* <Text>CalendarRN</Text> */}

			{/* <FlatList
					data={tasksList}
					renderItem={({ item }) => (
						<View>
							<Text>{item.title}</Text>
							<Text>Due date: {item.dueDate.toDate().toLocaleDateString()}</Text>
							<Text>Created On: {item.createdOn.toDate().toLocaleDateString()}</Text>
						</View>
					)}
				/> */}
			{/* </View>
		</View> */}

			{/* <Calendar /> */}
			<Text> AGENDA </Text>
			<View style={{ height: 600 }}>
				<Agenda
					items={tasksList}
					renderItem={({ item }) => (
						<View style={{ height: 50 }}>
							<Text>{item.title}</Text>
						</View>
					)}
				/>
			</View>
		</View>
	);
};

export default CalendarRN;
