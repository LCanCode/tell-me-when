import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const Board = ({ navigation }) => {
	const route = useRoute();
	const { title, description } = route.params;

	return (
		<View>
			<Text>{title}</Text>
			<Text>{description}</Text>
		</View>
	);
};

export default Board;
