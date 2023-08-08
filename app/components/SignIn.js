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

const SignIn = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
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

	const signIn = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			fetchUserDocument(auth.currentUser.uid);
		} catch (error) {
			alert("Sign in failed:", error.message);
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
						signIn();
						navigation.navigate("Home");
					}}
				>
					<Text> Sign In </Text>
				</Pressable>
			</KeyboardAvoidingView>
		</View>
	);
};

export default SignIn;
