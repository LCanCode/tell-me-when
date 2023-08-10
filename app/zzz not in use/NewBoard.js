// import { View, TextInput, Button } from "react-native";
// import { addDoc, collection } from "firebase/firestore";
// import React, { useState } from "react";
// import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";

// const NewBoard = ({ userBoards, setUserBoards }) => {
// 	const [board, setBoard] = useState({ title: "", description: "" });
// 	const [userBoards, setUserBoards] = useState([]);
// 	const auth = FIREBASE_AUTH;

// 	// to create a new board associated with a userID
// 	const newBoard = async () => {
// 		try {
// 			const userId = auth.currentUser.uid;
// 			const userBoardsCollection = collection(
// 				FIRESTORE_DB,
// 				"users",
// 				userId,
// 				"boards"
// 			);
// 			await addDoc(userBoardsCollection, {
// 				title: board.title,
// 				description: board.description,
// 			});
// 			setUserBoards(() => [
// 				...userBoards,
// 				{ id: board.id, title: board.title, description: board.description },
// 			]);
// 			setBoard({ title: "", description: "" });
// 			console.log("Board created");
// 		} catch (error) {
// 			console.log("Error creating board:", error);
// 		}
// 	};
// 	return (
// 		<View>
// 			<View>
// 				{/* button to create a new board */}
// 				<TextInput
// 					// style={styles.input}
// 					placeholder="Add new board"
// 					onChangeText={(text) => setBoard({ ...board, title: text })}
// 					value={board.title}
// 				/>
// 				<TextInput
// 					// style={styles.input}
// 					placeholder="New board description"
// 					onChangeText={(text) => setBoard({ ...board, description: text })}
// 					value={board.description}
// 				/>
// 				<Button
// 					onPress={() => newBoard()}
// 					title="Add Board"
// 					disabled={board.title === ""}
// 				/>
// 			</View>
// 		</View>
// 	);
// };

// export default NewBoard;
