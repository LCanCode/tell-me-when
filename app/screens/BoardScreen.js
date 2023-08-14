import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import ListScreen from "./ListScreen";
import tw from 'twrnc';

const BoardScreen = ({ navigation }) => {
	const route = useRoute();
	const { boardId, title, description } = route.params;

	return (
		<View style={tw`container h-full mx auto bg-black`}>
			<View style={tw`flex mr-8 mt-2`}>
				<Text style={tw`text-xl text-left pt-5 flex font-bold text-white`}>Board Title: {title}</Text>
				<Text style={tw`text-sm text-left  flex font-bold mb-6 text-white`}>Board Description: {description}</Text>
			</View>

			<View>
				<ListScreen boardId={boardId} />
			</View>
		</View>
	);
};

export default BoardScreen;
