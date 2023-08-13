import { View, Text, Pressable } from "react-native";
import React from "react";
import tw from "twrnc";

const UserHomeScreen = ({ navigation }) => {
	return (
		<View style={tw`flex-1 items-center bg-black p-4 `}>
      <View>
        <Text style={tw`text-white text-2xl`}> Search Bar Place Holder</Text>
      </View>
			<View style={tw`p-15 flex-basis-auto gap-3 items-center my-auto`}>
				<Pressable onPress={() => navigation.navigate("Users Boards")}>
					<Text style={tw`text-2xl font-bold mb-6 text-white py-3`}> My Boards </Text>
				</Pressable>
				<Pressable onPress={() => navigation.navigate("Calendar")}>
					<Text style={tw`text-2xl font-bold mb-6 text-white py-3`}> Calendar </Text>
				</Pressable>
				<Pressable onPress={() => navigation.navigate("Agenda")}>
					<Text style={tw`text-2xl font-bold mb-6 text-white py-3`}> Agenda </Text>
				</Pressable>
			</View>
		</View>
	);
};

export default UserHomeScreen;
