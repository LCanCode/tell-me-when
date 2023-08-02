import {
	View,
	Text,
	Button,
	TextInput,
	StyleSheet,
	FlatList,
	Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { firebase } from "../../firebaseConfig";

const NewList = () => {
	const [list, setList] = useState({ title: "", description: "" });
	const [lists, setLists] = useState([]);
	const auth = FIREBASE_AUTH;
	// const listRef = firebase.firestore().collection("list");

	// const addList = async () => {
	// 	try {
	// 		const userId = auth.currentUser.uid;
	// 		const userListCollection
	// 		const doc = await addDoc(collection(FIRESTORE_DB, "list"), {
	// 			title: list.title,
	// 			description: list.description,
	// 		});
	// 		setList({ title: "", description: "" });

	// 	}
	// };

	// useEffect(() => {
	// 	listRef.onSnapshot((querySnapshot) => {
	// 		const lists = [];
	// 		querySnapshot.forEach((doc) => {
	// 			const { title, description } = doc.data();
	// 			lists.push({
	// 				id: doc.id,
	// 				title,
	// 				description,
	// 			});
	// 		});
	// 		setLists(lists);
	// 	});
	// }, []);

	// const renderItems = ({ item }) => {
	// 	// const handlePress = () => {
	// 	// 	navigation.navigate("Board", { itemId: item.id, title: item.title, description: item.description });
	// 	// };
	// 	return (
	// 		<Pressable style={{ padding: 10 }}>
	// 			<Text>{item.title}</Text>
	// 			<Text> description: {item.description}</Text>
	// 		</Pressable>
	// 	);
	// };

	return (
		<View>
			<View>
				{/* to create a new list */}
				<TextInput
					// style={styles.input}
					placeholder="New List Title"
					onChangeText={(text) => setList({ ...list, title: text })}
					value={list.title}
				/>
				<TextInput
					// style={styles.input}
					placeholder="New List Description"
					onChangeText={(text) => setList({ ...list, description: text })}
					value={list.description}
				/>
				<Button
					onPress={() => addList()}
					title="Create List"
					disabled={list === ""}
				/>
			</View>
		</View>
	);
};

export default NewList;
