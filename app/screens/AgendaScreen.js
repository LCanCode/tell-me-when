import { View, Text, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { collection, getDocs, query, doc } from "firebase/firestore";
import { SectionList } from "react-native";
import * as Notifications from "expo-notifications";
import { Agenda } from "react-native-calendars";
import tw from "twrnc";

const AgendaScreen = ({ navigation }) => {
	const [sectionData, setSectionData] = useState([]);
	const groupTasks = {};

	//get all Tasks from all users boards/list
	useEffect(() => {
		const getAllTasks = async () => {
			try {
				const TasksCollection = collection(FIRESTORE_DB, "tasks");
				const q = query(TasksCollection);
				const querySnapshot = await getDocs(q);

				querySnapshot.forEach((doc) => {
					const { title, agendaDueDate, dueDate } = doc.data();
					const notifDueDate = new Date(dueDate);
					const now = new Date();
					const timeDiff = notifDueDate.getTime() - now.getTime();

					//sets notification if due date is 3 or less days away
					if (timeDiff <= 3 * 24 * 60 * 60 * 1000) {
						Notifications.scheduleNotificationAsync({
							content: {
								title: "Task Reminder",
								body: 'Your task "${title}" is due today!',
							},
							trigger: {
								seconds: Math.max(0, timeDiff / 1000),
							},
						});
					}

					//creates a list of objects with due dates as keys
					//and the task for that day as a list values
					if (groupTasks[agendaDueDate]) {
						groupTasks[agendaDueDate].data.push(title);
					} else {
						groupTasks[agendaDueDate] = { title: agendaDueDate, data: [title] };
					}
				});
				const allTasks = [];
				for (const key in groupTasks) {
					allTasks.push(groupTasks[key]);
				}
				setSectionData(allTasks);
				console.log("section data", sectionData);
				if (sectionData.length == 0) {
					console.log("this tasks list is empty", allTasks.length);
				}
			} catch (error) {
				console.log("error getting task for ths list", error);
			}
		};
		getAllTasks();
	}, []);

	const tasks = {
		"2023-08-16": [{ title: "two" }, { title: "hi" }],
	};

	useEffect(() => {
		const subscription = Notifications.addNotificationResponseReceivedListener(
			(response) => {
				console.log("Notification interaction:", response.actionIdentifier);
			}
		);
		return () => subscription.remove();
	}, []);

	const newAgendaDate = sectionData.reduce((accumulator, section) => {
		accumulator[section.title] = section.data;
		return accumulator;
		console.log(newAgendaDate);
	}, {});

	return (
		<SafeAreaView style={tw`flex-1 bg-gray-100`}>
			<Text style={tw`text-center text-cyan-700 text-3xl underline font-bold`}>
				{" "}
				TASK DUE
			</Text>
			{/* <View style={{ height: 600 }}>
				<Agenda
					items={newAgendaDate}
					renderItem={(items) => (
						<View style={tw`h-50, pt-2`}>
							<Text style={tw`self-center`}>{items}</Text>
						</View>
					)}
				/>
			</View> */}
			{/* <Text>AgendaScreen</Text> */}

			{/* take task data and make data object for section list */}
			<View style={tw`p-4 `}>
				<SectionList
					sections={sectionData}
					keyExtractor={(item, index) => item + index}
					renderItem={({ item }) => (
						<View>
							<View style={tw`my-2`}>
								<Text
									style={tw`text-center text-cyan-700 text-xl font- p-2 border-2 rounded-lg border`}
								>
									{item}
								</Text>
							</View>
						</View>
					)}
					renderSectionHeader={({ section: { title } }) => (
						<View style={tw`m-4`}>
							<Text style={tw`text-center text-cyan-700 text-xl font-black`}>
								{title}
							</Text>
						</View>
					)}
				/>
			</View>
		</SafeAreaView>
	);
};

export default AgendaScreen;
