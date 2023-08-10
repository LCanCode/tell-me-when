import { View, Text, Pressable, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH, firebase } from "../../firebaseConfig";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const GoogleSignIn = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [user, setUser] = useState("");
	const auth = FIREBASE_AUTH;
	const provider = new GoogleAuthProvider();

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

	const googleSignInAuth = async () => {
		try {
			await signInWithRedirect(auth, provider);
			fetchUserDocument(auth.currentUser.uid);
			const result = await getRedirectResult(auth);
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			const user = result.user;
		} catch (error) {
			console.log("Error using google sign in", error.message, error.code);
		}
	};

	return (
		<View>
			<KeyboardAvoidingView behavior="padding">
				<Pressable
					onPress={() => {
						googleSignInAuth();
						navigation.navigate("Home");
					}}
				>
					<Text> Sign in with Google</Text>
				</Pressable>
			</KeyboardAvoidingView>
		</View>
	);
};

export default GoogleSignIn;
