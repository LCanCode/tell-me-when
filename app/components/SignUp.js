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

	const signUp = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			alert("Succesful sign up! Use your email and password to log in.");
			createUserDocument(auth.currentUser.uid, email);
		} catch (error) {
			alert("Sign up failed:", error.message, error.code);
		}
	};

	return (
		<View>
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
				<Pressable
					onPress={() => {
						signUp();
						navigation.navigate("Login");
					}}
				>
					<Text> Create an Account </Text>
				</Pressable>
			</KeyboardAvoidingView>
		</View>
	);
};

export default SignUp;
