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
			<Pressable
				onPress={() => {
					handleSignIn();
				}}
			>
				<Text> Sign In </Text>
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

export default SignIn;
