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
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import tw from "twrnc";

const UsersBoards = ({ navigation }) => {
	const [userBoards, setUserBoards] = useState([]);
	const [board, setBoard] = useState({ title: "", description: "" });
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
				});
				setUserBoards(userBoards);
				console.log("user boards:", userBoards);
			} catch (error) {
				console.log("error fetching user boards:", error);
			}
		};
		getUserBoards();
	}, []);

	// to create a new board associated with a userID
	const newBoard = async () => {
		try {
			const userId = auth.currentUser.uid;
			const userBoardsCollection = collection(
				FIRESTORE_DB,
				"users",
				userId,
				"boards"
			);
			await addDoc(userBoardsCollection, {
				title: board.title,
				description: board.description,
			});
			setUserBoards(() => [
				...userBoards,
				{ id: board.id, title: board.title, description: board.description },
			]);
			setBoard({ title: "", description: "" });
			console.log("Board created", id, title, description);
		} catch (error) {
			console.log("Error creating board:", error);
		}
	};

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
			<Pressable onPress={handlePress}>
				<Text style={tw`p-1 text-white`}> {item.title}</Text>
				<Text style={tw`p-5 text-white`}> description: {item.description}</Text>
			</Pressable>
		);
	};

	return (
		<View style={tw`flex-1  bg-black`}>
			<View style={styles.form}>
				{/* list of all users boards */}
				<FlatList data={userBoards} renderItem={renderItems} />
			</View>
			<View style={tw`flex-1 pt-15`}>
				{/* button to create a new board */}
				<TextInput
					style={tw`text-black bg-white rounded-sm h-9 px-4 mb-1`}
					placeholder="Add new board"
					onChangeText={(text) => setBoard({ ...board, title: text })}
					value={board.title}
				/>
				<TextInput
					style={tw`text-black bg-white rounded-sm h-9 px-4 mb-.5 `}
					placeholder="New board description"
					onChangeText={(text) => setBoard({ ...board, description: text })}
					value={board.description}
				/>

				<View>
					<Pressable
						style={tw` border-2 border-white rounded-md
          flex flex-row justify-center items-center px-4 my-1 `}
						onPress={() => newBoard()}
						disabled={board.title === ""}
					>
						<Text style={tw`text-white text-base font-medium`}>
							{" "}
							Add Board{" "}
						</Text>
					</Pressable>
				</View>
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
