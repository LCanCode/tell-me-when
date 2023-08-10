import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import BoardScreen from "./app/components/BoardScreen";
import UsersBoards from "./app/screens/UsersBoards";
import LoginScreen from "./app/screens/LoginScreen";
import UserHomeScreen from "./app/screens/UserHomeScreen";
import CalendarRN from "./app/screens/CalendarRN";
import ListScreen from "./app/screens/ListScreen";
import { useState } from "react";


const Stack = createNativeStackNavigator();

export default function App() {
	const [authenticated, setAuthenticated] = useState(false);

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Login">
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Home" component={UserHomeScreen} />
				<Stack.Screen name="Users Boards" component={UsersBoards} />
				<Stack.Screen name="Calendar" component={CalendarRN} />
				<Stack.Screen name="Board" component={BoardScreen} />
				<Stack.Screen name="List" component={ListScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
