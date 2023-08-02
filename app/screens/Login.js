import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	Pressable,
	KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH, firebase } from "../../firebaseConfig";

const Login = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState("");
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

	const signUp = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			alert("Succesful sign up! Use your email and password to log in.");
			createUserDocument(auth.currentUser.uid, email);
		} catch (error) {
			alert("Sign up failed:", error.message);
		}
	};

	const signIn = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			fetchUserDocument(auth.currentUser.uid);
		} catch (error) {
			alert("Sign in failed:",  error.message);
		}
	};

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView behavior="padding">
				<Text>after logging in, directs to AllBoards</Text>

				<TextInput
					style={styles.input}
					placeholder="email"
					onChangeText={(text) => setEmail(text)}
					value={email}
				/>
				<TextInput
					style={styles.input}
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
					<Text> Create an Account</Text>
				</Pressable>
				<Pressable
					onPress={() => {
						signIn();
						navigation.navigate("All Boards");
					}}
				>
					{/* need way to validate if user has an account then proceed to all boards*/}

					<Text> Sign In </Text>
				</Pressable>
			</KeyboardAvoidingView>
		</View>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		flexDirection: "column",
		paddingVertical: 20,
	},

	input: {
		marginVertical: 4,
		borderWidth: 1,
		borderRadius: 4,
		height: 60,
		padding: 10,
		backgroundColor: "#fff",
	},
});
