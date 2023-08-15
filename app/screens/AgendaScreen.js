import { View, Text, SafeAreaView} from "react-native";
import React, { useState, useEffect } from "react";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { collection, getDocs, query, doc } from "firebase/firestore";
import { SectionList } from "react-native";

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
        const allTasks = []
        for (const key in groupTasks) {
          allTasks.push(groupTasks[key]);
        }
				setSectionData(allTasks);
        console.log("section data", sectionData)
				if (sectionData.length == 0) {
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
		<SafeAreaView>
			<Text>AgendaScreen</Text>
      <SectionList 
      sections={sectionData}
      keyExtractor={(item, index) => item +index} 
      renderItem={({item}) => (
        <View>
          <Text>{item}</Text>
        </View>
      )}
      renderSectionHeader={({section: {title}}) => ( 
        <Text>{title}</Text>
      )}
        />
		</SafeAreaView>

	);
};

export default AgendaScreen;
