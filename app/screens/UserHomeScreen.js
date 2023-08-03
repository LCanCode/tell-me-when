import { View, Text, Pressable } from "react-native";
import React from "react";

const UserHomeScreen = ({ navigation }) => {
	return (
		<View>
			<Text> Welcome to my Tell Me When! </Text>
			<Pressable onPress={() => navigation.navigate("Users Boards")}>
				<Text> My Boards </Text>
			</Pressable>
			<Pressable onPress={() => navigation.navigate("Calendar")}>
				<Text> My Calendar </Text>
			</Pressable>
		</View>
	);
};

export default UserHomeScreen;
