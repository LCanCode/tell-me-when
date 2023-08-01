import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	Pressable,
} from "react-native";
import React, { useState } from "react";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";

const Login = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const auth = getAuth();

	const signUp = async () => {
		createUserWithEmailAndPassword(auth, email, password);
	};

	const signIn = async () => {
		signInWithEmailAndPassword(auth, email, password);
	};

	return (
		<View style={styles.container}>
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
			/>
			<Pressable onPress={() => signUp()}>
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
