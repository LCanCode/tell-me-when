// import { View, TextInput, Button } from "react-native";
// import { addDoc, collection } from "firebase/firestore";
// import React, { useState } from "react";
// import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";

// const NewList = ({ boardId }) => {
// 	const [list, setList] = useState({ title: "", description: "" });
// 	const [usersLists, setUsersLists] = useState([]);
// 	const auth = FIREBASE_AUTH;

// 	// create a new list associated with a boardId
// 	const addList = async () => {
// 		try {
// 			const userId = auth.currentUser.uid;
// 			const userListCollection = collection(FIRESTORE_DB, "list");
// 			await addDoc(userListCollection, {
// 				title: list.title,
// 				description: list.description,
// 				boardId: boardId,
// 				userId: userId,
// 			});
// 			setUsersLists(() => [
// 				...usersLists,
// 				{
// 					title: list.title,
// 					description: list.description,
// 					boardId: boardId,
// 					userId: userId,
// 				},
// 			]);
// 			setList({ title: "", description: "" });
// 			console.log("list created with board id", boardId);
// 		} catch (error) {
// 			console.log("error creating list", error);
// 		}
// 	};
// 	return (
// 		<View>
// 			{/* button to create a new list */}
// 			<TextInput
// 				// style={styles.input}
// 				placeholder="New List Title"
// 				onChangeText={(text) => setList({ ...list, title: text })}
// 				value={list.title}
// 			/>
// 			<TextInput
// 				// style={styles.input}
// 				placeholder="New List Description"
// 				onChangeText={(text) => setList({ ...list, description: text })}
// 				value={list.description}
// 			/>
// 			<Button
// 				onPress={() => addList()}
// 				title="Create List"
// 				disabled={list.title === ""}
// 			/>
// 		</View>
// 	);
// };

// export default NewList;
