import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import ListScreen from "./ListScreen";
import tw from 'twrnc';

const BoardScreen = ({ navigation }) => {
	const route = useRoute();
	const { boardId, title, description } = route.params;

	return (
		<View style={tw`flex-1 bg-cyan-300 opacity-90 w-100`}>
			<View style={tw``}>
				<Text style={tw`text-cyan-700 text-2xl
            font-extrabold tracking-widest mb-1 text-center`}>{title}</Text>
				<Text style={tw`text-sm text-left  flex font-bold mb-6 text-cyan-700 text-center`}>Board Description: {description}</Text>
			</View>

			<View>
				<ListScreen boardId={boardId} />
			</View>
		</View>
	);
};

export default BoardScreen;
