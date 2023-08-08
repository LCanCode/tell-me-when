// import {
// 	View,
// 	Text,
// 	TextInput,
// 	StyleSheet,
// 	Pressable,
// 	KeyboardAvoidingView,
// } from "react-native";
// import React, { useState } from "react";
// import {
// 	createUserWithEmailAndPassword,
// 	signInWithEmailAndPassword,
// 	GoogleAuthProvider,
// 	getRedirectResult,
// 	signInWithRedirect,
// 	onAuthStateChanged,
// } from "firebase/auth";
// import { FIREBASE_AUTH, firebase } from "../../firebaseConfig";
// import SignUp from "../components/SignUp";
// import SignIn from "../components/SignIn";
// import GoogleSignIn from "../components/GoogleSignIn";

// const OldLogin = ({ navigation }) => {
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	// const [user, setUser] = useState("");
// 	const auth = FIREBASE_AUTH;
// 	// const provider = new GoogleAuthProvider();

	// const createUserDocument = async (userId, email) => {
	// 	try {
	// 		const usersCollection = firebase.firestore().collection("users");
	// 		const userData = {
	// 			email: email,
	// 		};
	// 		await usersCollection.doc(userId).set(userData);
	// 		console.log("user doc created");
	// 	} catch (error) {
	// 		console.log("Error creating user doc:", error);
	// 	}
	// };

	// const fetchUserDocument = async (userId) => {
	// 	try {
	// 		const usersCollection = firebase.firestore().collection("users");
	// 		const userDoc = await usersCollection.doc(userId).get();
	// 		if (userDoc.exists) {
	// 			const userData = userDoc.data();
	// 			console.log("userdoc found", userData);
	// 		} else {
	// 			console.log("user doc not found");
	// 		}
	// 	} catch (error) {
	// 		console.log("error fetching data:", error);
	// 	}
	// };

	// const signUp = async () => {
	// 	try {
	// 		await createUserWithEmailAndPassword(auth, email, password);
	// 		alert("Succesful sign up! Use your email and password to log in.");
	// 		createUserDocument(auth.currentUser.uid, email);
	// 	} catch (error) {
	// 		alert("Sign up failed:", error.message, error.code);
	// 	}
	// };

	// const signIn = async () => {
	// 	try {
	// 		await signInWithEmailAndPassword(auth, email, password);
	// 		fetchUserDocument(auth.currentUser.uid);
	// 	} catch (error) {
	// 		alert("Sign in failed:", error.message);
	// 	}
	// };

	// const googleSignInAuth = async () => {
	// 	try {
	// 		await signInWithRedirect(auth, provider);
	// 		fetchUserDocument(auth.currentUser.uid);
	// 		const result = await getRedirectResult(auth);
	// 		const credential = GoogleAuthProvider.credentialFromResult(result);
	// 		const token = credential.accessToken;
	// 		const user = result.user;
	// 	} catch (error) {
	// 		console.log("Error using google sign in", error.message, error.code);
	// 	}

// 	return (
// 		<View>
// 			<View>
// 				<SignUp navigation={navigation} />
// 			</View>
// 			<View>
// 				<SignIn navigation={navigation} />
// 			</View>
// 			<View>
// 				<GoogleSignIn navigation={navigation} />
// 			</View>
// 		</View>
// 	);
// };
// <View style={styles.container}>
// 	<KeyboardAvoidingView behavior="padding">
// 		<Text>after logging in, directs to AllBoards</Text>

// 		<TextInput
// 			style={styles.input}
// 			placeholder="email"
// 			onChangeText={(text) => setEmail(text)}
// 			value={email}
// 		/>
// 		<TextInput
// 			style={styles.input}
// 			placeholder="password"
// 			onChangeText={(text) => setPassword(text)}
// 			value={password}
// 			secureTextEntry={true}
// 		/>
// 		<Pressable
// 			onPress={() => {
// 				signUp();
// 				navigation.navigate("Login");
// 			}}
// 		>
// 			<Text> Create an Account</Text>
// 		</Pressable>
// 		<Pressable
// 			onPress={() => {
// 				signIn();
// 				navigation.navigate("Home");
// 			}}
// 		>
// 			<Text> Sign In </Text>
// 		</Pressable>
// 		<Pressable
// 			onPress={() => {
// 				googleSignInAuth();
// 				navigation.navigate("Home");
// 			}}
// 		>
// 			<Text> Sign in with Google</Text>
// 		</Pressable>
// 	</KeyboardAvoidingView>
// </View>

// export default OldLogin;

// const styles = StyleSheet.create({
// 	container: {
// 		marginHorizontal: 20,
// 		flexDirection: "column",
// 		paddingVertical: 20,
// 	},

// 	input: {
// 		marginVertical: 4,
// 		borderWidth: 1,
// 		borderRadius: 4,
// 		height: 60,
// 		padding: 10,
// 		backgroundColor: "#fff",
// 	},
// });
