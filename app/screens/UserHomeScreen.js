import { View, Text, Pressable } from "react-native";
import React from "react";
import tw from "twrnc";
import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";

const UserHomeScreen = ({ navigation }) => {
	return (
		<View style={tw`flex-1 items-center bg-black `}>
      {/* <View> */}
        {/* <SearchBar /> */}
        {/* <Text style={tw`text-white text-2xl py-3`}> Search Bar Place Holder</Text> */}
      {/* </View> */}
      <View>
        <NavBar />
      </View>
			<View style={tw`p-7 flex-basis-auto gap-3 items-center my-15  `}>
				<Pressable style={tw`h-auto border-white border-2 rounded-md px-6 my-4.5`} onPress={() => navigation.navigate("Users Boards")}>
					<Text style={tw`text-2xl font-bold my-0 text-white py-3 `}> My Boards </Text>
				</Pressable>
				<Pressable style={tw`h-auto border-white border-2 rounded-md px-6 my-4.5`}onPress={() => navigation.navigate("Calendar")}>
					<Text style={tw`text-2xl font-bold my-0 text-white py-3 `}> Calendar </Text>
				</Pressable>
				<Pressable style={tw`h-auto border-white border-2 rounded-md px-6 my-4.5`} onPress={() => navigation.navigate("Agenda")}>
					<Text style={tw`text-2xl font-bold my-0 text-white py-3 `}> Agenda </Text>
				</Pressable>
			</View>
		</View>
	);
};

export default UserHomeScreen;
