import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import NewList from "./NewList";

const Board = ({ navigation }) => {
	const route = useRoute();
	const { title, description } = route.params;

	return (
		<View>
      <View>
			<Text>Board Title: {title}</Text>
			<Text>Board Description: {description}</Text>
      </View>

      <View>
        <NewList />
      </View>
		</View>

    
	);
};

export default Board;
