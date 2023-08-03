import {
	View,
	Text,
	Button,
	TextInput,
	StyleSheet,
	FlatList,
	Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getDocs, addDoc, collection, query } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { FIREBASE_AUTH } from "../../firebaseConfig";

const UsersBoards = ({ navigation }) => {
	const [userBoards, setUserBoards] = useState([]);
	const auth = FIREBASE_AUTH;

	// to get all boards associated with a userID
	useEffect(() => {
		const getUserBoards = async () => {
			try {
				const userId = auth.currentUser.uid;
				const userBoardsCollection = collection(
					FIRESTORE_DB,
					"users",
					userId,
					"boards"
				);
				const q = query(userBoardsCollection);
				const querySnapshot = await getDocs(q);

				const userBoards = [];
				querySnapshot.forEach((doc) => {
					const { title, description } = doc.data();
					userBoards.push({ id: doc.id, title, description });
				});3
				setUserBoards(userBoards);
				console.log("user boards:", userBoards);
			} catch (error) {
				console.log("error fetching user boards:", error);
			}
		};
		getUserBoards();
	}, []);

	// to render each board clickable on page
	// clicking board title opens that board
	const renderItems = ({ item }) => {
		const handlePress = () => {
			navigation.navigate("Board", {
				boardId: item.id,
				title: item.title,
				description: item.description,
			});
		};
		return (
			<Pressable onPress={handlePress} style={{ padding: 10 }}>
				<Text>{item.title}</Text>
				<Text> description: {item.description}</Text>
			</Pressable>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.form}>
				{/* list of all users boards */}
				<FlatList data={userBoards} renderItem={renderItems} />

			</View>
		</View>
	);
};

export default UsersBoards;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
	},
	form: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 20,
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderRadius: 4,
		height: 40,
		padding: 10,
		backgroundColor: "#fff",
	},
});
