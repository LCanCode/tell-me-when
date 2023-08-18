import { View, Text, Pressable } from "react-native";
import React from "react";
import tw from "twrnc";
import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";

const UserHomeScreen = ({ navigation }) => {
	return (
		<View style={tw`flex-1 bg-cyan-300 opacity-90 w-100 `}>

      <View style={tw`flex-shrink`}>
        <NavBar />
      </View>

			<View style={tw`flex-3 items-center mt-25 `}>
        <View style={tw`justify-center border-2 rounded-lg border-cyan-700 w-50 h-20 m-6 p-6 bg-orange-100`}>
				<Pressable style={tw``} onPress={() => navigation.navigate("Users Boards")}>
					<Text style={tw`self-center text-cyan-700 text-xl font-black`}> My Boards </Text>
				</Pressable>
        </View>

        <View style={tw`justify-center border-2 rounded-lg border-cyan-700 w-50 h-20 m-6 p-6 bg-orange-100`}>
				<Pressable style={tw``}onPress={() => navigation.navigate("Calendar")}>
					<Text style={tw`self-center text-cyan-700 text-xl font-black`}> Calendar </Text>
				</Pressable>
        </View>


        <View style={tw`justify-center border-2 rounded-lg border-cyan-700 w-50 h-20 m-6 p-6 bg-orange-100`}> 
				<Pressable style={tw``} onPress={() => navigation.navigate("Agenda")}>
					<Text style={tw`self-center text-cyan-700 text-xl font-black`}> Agenda </Text>
				</Pressable>
			</View>
      </View>
		</View>
	);
};

export default UserHomeScreen;
