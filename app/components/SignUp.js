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
		<View>
			<Pressable
				onPress={() => {
					handleSignUp();
				}}
			>
				<Text> Create an Account </Text>
			</Pressable>
			<KeyboardAvoidingView behavior="padding">
				<TextInput
					placeholder="email"
					onChangeText={(text) => setEmail(text)}
					value={email}
				/>
				<TextInput
					placeholder="password"
					onChangeText={(text) => setPassword(text)}
					value={password}
					secureTextEntry={true}
				/>
			</KeyboardAvoidingView>
		</View>
	);
};

export default SignUp;
