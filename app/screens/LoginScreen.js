import { View, Pressable, Text, TextInput } from "react-native";
import tw from "twrnc";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";

const LoginScreen = ({ navigation }) => {
	return (
		<View style={tw`flex-1 bg-cyan-300 opacity-90`}>
			<View style={tw`flex-9 justify-center`}>
				<Text style={tw`self-center text-2xl text-cyan-700 font-black p-3 `}>Login</Text>
				<View style={tw` self-center w-70` }>
					<SignIn navigation={navigation} />
				</View>
			</View>

			<View style={tw`flex-5 flex-shrink align-center`}>
				<Pressable
					style={tw`self-center`}
					onPress={() => {
						navigation.navigate("Sign Up");
					}}
				>
					<Text style={tw`self-center text-cyan-700 font-lg`}> or </Text>
					<Text style={tw`self-center text-cyan-700 font-black`}> Create an Account </Text>
				</Pressable>
			</View>
		</View>
	);
};

export default LoginScreen;
