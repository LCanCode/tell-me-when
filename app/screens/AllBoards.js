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
import { firebase } from "../../firebaseConfig"

const AllBoards = () => {
	const [board, setBoard] = useState([]);
	const [boards, setBoards] = useState([]);
	const boardRef = firebase.firestore().collection("boards");

	useEffect(() => {
		boardRef.onSnapshot((querySnapshot) => {
			const boards = [];
			querySnapshot.forEach((doc) => {
				const { title, done } = doc.data();
				boards.push({
					id: doc.id,
					title,
					done,
				});
			});
			setBoards(boards);
		});
	}, []);

	useEffect(() => {}, []);

	const addBoard = async () => {
		const doc = await addDoc(collection(FIRESTORE_DB, "boards"), {
			title: board,
			done: false,
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.form}>
				<Text>
					{" "}
					All Boards is the home page that shows all boards a user has access to
					and space to create a new board
				</Text>
				{/* list of all boards */}
				<FlatList
					data={boards}
					renderItem={({ item }) => (
						<Pressable>
							<View>
								<Text> {item.title}</Text>
								<Text> {item.done}</Text>
							</View>
						</Pressable>
					)}
				/>

				{/* to create a new board */}
				<TextInput
					style={styles.input}
					placeholder="Add new board"
					onChangeText={(text) => setBoard(text)}
					value={board}
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
