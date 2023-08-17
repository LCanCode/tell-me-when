import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import BoardScreen from "./app/screens/BoardScreen";
import UsersBoards from "./app/components/UsersBoards";
import LoginScreen from "./app/screens/LoginScreen";
import UserHomeScreen from "./app/screens/UserHomeScreen";
import CalendarRN from "./app/screens/CalendarRN";
import ListScreen from "./app/screens/ListScreen";
import SignUp from "./app/components/SignUp";
import AgendaScreen from "./app/screens/AgendaScreen";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import * as Notifications from "expo-notifications";
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';

const Stack = createNativeStackNavigator();

export default function App() {
	const [authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, [])

	return (
		<SafeAreaView style={tw`flex-1`}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Login">
					<Stack.Screen
						options={{ title: "Tell Me When" }}
						name="Login"
						component={LoginScreen}
					/>
					<Stack.Screen
						options={{ title: "Tell Me When" }}
						name="Home"
						component={UserHomeScreen}
					/>
					<Stack.Screen name="Users Boards" component={UsersBoards} />
					<Stack.Screen name="Calendar" component={CalendarRN} />
					<Stack.Screen name="Board" component={BoardScreen} />
					<Stack.Screen name="List" component={ListScreen} />
					<Stack.Screen name="Sign Up" component={SignUp} />
					<Stack.Screen
						screenOptions={{
							headerShown: false,
						}}
						name="Agenda"
						component={AgendaScreen}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
}
