import {
	View,
	TextInput,
	Pressable,
	KeyboardAvoidingView,
	Text,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH, firebase } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import tw from 'twrnc';

const SignIn = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [isSignedIn, setIsSignedIn] = useState(false);
	const auth = FIREBASE_AUTH;

	const fetchUserDocument = async (userId) => {
		try {
			const usersCollection = firebase.firestore().collection("users");
			const userDoc = await usersCollection.doc(userId).get();
			if (userDoc.exists) {
				const userData = userDoc.data();
				console.log("userdoc found", userData);
			} else {
				console.log("user doc not found");
			}
		} catch (error) {
			console.log("error fetching data:", error);
		}
	};

	const handleSignIn = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			// setIsSignedIn(true);
			fetchUserDocument(auth.currentUser.uid);
			console.log("Succesful Sign in");
			navigation.navigate("Home");
		} catch (error) {
			alert("Sign in failed:", error.message);
			console.log(error);
		}
	};

	return (
		<View>
			<KeyboardAvoidingView behavior="padding">
				<TextInput
          style={tw`w-full bg-white rounded-md h-12 px-4 mb-4 mr-40`}
          placeholderTextColor="#000"
					placeholder="Enter email"
					onChangeText={(text) => setEmail(text)}
					value={email}
				/>
				<TextInput
          style={tw`w-full bg-white rounded-md h-12 px-4 mr-40`}
          placeholderTextColor="#000"
					placeholder="Enter password"
					onChangeText={(text) => setPassword(text)}
					value={password}
					secureTextEntry={true}
				/>
			<Pressable
        style={tw`h-12 border-2 border-cyan-700 rounded-md flex flex-row justify-center items-center px-6 my-4.5`}
				onPress={() => {
          handleSignIn();
				}}
			>
        <View style={tw`flex-2 flex items-center`}> 
        <Text style={tw`text-cyan-700 text-base font-medium`}> Sign In </Text>
        </View>
			</Pressable>
      </KeyboardAvoidingView>
		</View>
	);
};

export default SignIn;
