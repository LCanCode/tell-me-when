import { View, Text } from "react-native";
import { Calendar, Agenda } from "react-native-calendars";
import React from "react";

const CalendarRN = () => {
	const tasks = {
		"2023-08-09": [{ title: "one" }],
	};

	return (
		<View>
			<Text>CalendarRN</Text>
			<Calendar />
			<Text> AGENDA </Text>
      <View style={{height: 600}}>
			<Agenda
      items={tasks}
				renderItem={(item) => (
					<View style={{height: 50}}>
						<Text>{item.title}</Text>
					</View>
  )}
			/>
      </View>
		</View>
	);
};

export default CalendarRN;
