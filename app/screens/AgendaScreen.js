import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { collection, getDocs, query, doc } from "firebase/firestore";

const AgendaScreen = ({ navigation }) => {
	const [allTasks, setAllTasks] = useState("");
  const sectionData = [];
  const groupTasks = {};

	//get all Tasks from all users boards/list 
  // and make it data for section list
	useEffect(() => {
		const getAllTasks = async () => {
			try {
				const TasksCollection = collection(FIRESTORE_DB, "tasks");
				const q = query(TasksCollection);
				const querySnapshot = await getDocs(q);

				const allTasks = [];
				querySnapshot.forEach((doc) => {
					const {
						title,
						agendaDueDate,
					} = doc.data();

          if (groupTasks[agendaDueDate]) {
            groupTasks[agendaDueDate].data.push(title);
          } else {
            groupTasks[agendaDueDate] = { title: agendaDueDate, data: [title],};
          }
				});
        for (const key in groupTasks) {
          sectionData.push(groupTasks[key]);
        }
        console.log("section data", sectionData)
				if (allTasks.length == 0) {
					console.log("this tasks list is empty", allTasks.length);
				}
			} catch (error) {
				console.log("error getting task for ths list", error);
			}
		};
		getAllTasks();
	}, []);

  // take task data and make data object for section list

	return (
		<View>
			<Text>AgendaScreen</Text>
		</View>
	);
};

export default AgendaScreen;
