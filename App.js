import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Board from "./app/components/Board";
import AllBoards from "./app/screens/AllBoards";
import Login from "./app/screens/Login";
import UserHomeScreen from "./app/screens/UserHomeScreen";
import Calendar from "./app/screens/Calendar";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
	const [authenticated, setAuthenticated] = useState(false);

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Home" component={UserHomeScreen} />
				<Stack.Screen name="All Boards" component={AllBoards} />
				<Stack.Screen name="Calendar" component={Calendar} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// }
