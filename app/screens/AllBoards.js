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
import { doc, getDoc, getDocs, addDoc, collection } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import Board from "../components/Board";
import { firebase } from "../../firebaseConfig";

const AllBoards = ({ navigation }) => {
	const [board, setBoard] = useState([{ title: "", description: "" }]);
	const [boards, setBoards] = useState([]);
	const boardRef = firebase.firestore().collection("boards");

	const addBoard = async () => {
		if (board.title && board.description) {
			const doc = await addDoc(collection(FIRESTORE_DB, "boards"), {
				title: board.title,
				description: board.description,
			});
			setBoard({ title: "", description: "" });
		}
	};

	useEffect(() => {
		boardRef.onSnapshot((querySnapshot) => {
			const boards = [];
			querySnapshot.forEach((doc) => {
				const { title, description } = doc.data();
				boards.push({
					id: doc.id,
					title,
					description,
				});
			});
			setBoards(boards);
		});
	}, []);

	const renderItems = ({ item }) => {
		const handlePress = () => {
			navigation.navigate("Board", { itemId: item.id, title: item.title, description: item.description });
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
				{/* list of all boards */}
				<FlatList data={boards} renderItem={renderItems} />

				{/* to create a new board */}
				<TextInput
					style={styles.input}
					placeholder="Add new board"
					onChangeText={(text) => setBoard({ ...board, title: text })}
					value={board.title}
				/>
				<TextInput
					style={styles.input}
					placeholder="New board description"
					onChangeText={(text) => setBoard({ ...board, description: text })}
					value={board.description}
				/>
				<Button
					onPress={() => addBoard()}
					title="Add Board"
					disabled={board === ""}
				/>
			</View>
		</View>
	);
};

export default AllBoards;

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
