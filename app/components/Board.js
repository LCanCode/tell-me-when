import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import NewList from "./ListScreen";

const Board = ({ navigation }) => {
	const route = useRoute();
	const { boardId, title, description } = route.params;

	return (
		<View>
			<View>
				<Text>Board Title: {title}</Text>
				<Text>Board Description: {description}</Text>
			</View>

			<View>
				<ListScreen boardId={boardId}/>
			</View>
		</View>
	);
};

export default Board;
