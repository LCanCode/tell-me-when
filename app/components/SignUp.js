import {
	View,
	TextInput,
	Pressable,
	KeyboardAvoidingView,
	Text,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH, firebase } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import tw from "twrnc";

const SignUp = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const auth = FIREBASE_AUTH;

	const createUserDocument = async (userId, email) => {
		try {
			const usersCollection = firebase.firestore().collection("users");
			const userData = {
				email: email,
			};
			await usersCollection.doc(userId).set(userData);
			console.log("user doc created");
		} catch (error) {
			console.log("Error creating user doc:", error);
		}
	};

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

	const handleSignUp = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			alert("Succesful sign up!");
			createUserDocument(auth.currentUser.uid, email);
			await fetchUserDocument(auth.currentUser.uid);
			navigation.navigate("Home");
		} catch (error) {
			alert("Sign up failed:", error.message, error.code);
		}
	};

	return (
		<View style={tw`flex-1 items-center justify-start bg-black`}>
			<View style={tw`p-8 w-full max-w-xs flex justify-center content-center`}>
				<KeyboardAvoidingView behavior="padding">
					<Text style={tw`text-2xl font-bold mb-6 text-white`}>Create an Account</Text>
					<TextInput
						style={tw`w-full bg-white rounded-md h-12 px-4 mb-4 mr-40`}
						placeholderTextColor="#000"
						placeholder="Enter email"
						onChangeText={(text) => setEmail(text)}
						value={email}
					/>
					<TextInput
						style={tw`w-full bg-white rounded-md h-12 px-4 mb-4 mr-40`}
						placeholderTextColor="#000"
						placeholder="Create a password"
						onChangeText={(text) => setPassword(text)}
						value={password}
						secureTextEntry={true}
					/>
					<Pressable
						style={tw`h-12 border-2 border-white rounded-md flex flex-row justify-center items-center px-6 my-4.5`}
						onPress={() => {
							handleSignUp();
						}}
					>
						<View style={tw`flex-2 flex items-center`}>
							<Text style={tw`text-white text-base font-medium`}>
								{" "}
								Register{" "}
							</Text>
						</View>
					</Pressable>
				</KeyboardAvoidingView>
			</View>
		</View>
	);
};

export default SignUp;
