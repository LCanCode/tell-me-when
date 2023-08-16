import { View, Pressable, Text, TextInput } from "react-native";
import tw from "twrnc";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";

const LoginScreen = ({ navigation }) => {
	return (
		<View style={tw`flex-1 items-center justify-start bg-black`}>

			<View style={tw`p-8 w-full max-w-xs`}>
				<Text style={tw`text-3xl font-bold mb-6 text-white`}>Login</Text>
				<SignIn navigation={navigation} />
			</View>
      <Pressable
        style={tw`h-12 border-2 border-white rounded-md flex flex-row justify-center items-center px-6 my-4.5`}
				onPress={() => {
          navigation.navigate("Sign Up");
				}}
			>
      <Text style={tw`text-lg text-white justify-center`}> Create an Account </Text>
      </Pressable>

		</View>
	);
};

export default LoginScreen;
