import { View, Text } from "react-native";
import React, { useEffect } from "react";
import * as AuthSession from "expo-auth-session";
import { WebView } from "react-native-webview";

const Calendar = ({ navigate }) => {
	// useEffect(() => {
	// 	const googleCalendarIntegration = async () => {
	// 		const [response, promptAsync] = AuthSession.useAuthRequest(
	// 			{
	// 				clientId:
	// 					"343838702959-qndh7ne6s65mvl24151qdv4p32mh2q20.apps.googleusercontent.com",
	// 				redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
	// 				// Scope defines what you want to access (e.g., Google Calendar API)
	// 				scopes: ["https://www.googleapis.com/auth/calendar.events"],
	// 			},
	// 			{ authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth" }
	// 		);
	// 		const result = await promptAsync();
	// 		console.log(result);
	// 	};

	// 	googleCalendarIntegration();
	// }, []);

	// const handleNavigation = (newNavState) => {
	// 	if (newNavState.url.startsWith(AuthSession.makeRedirectUri())) {
	// 		// Check if the authentication was successful
	// 		if (newNavState.url.includes("code=")) {
	// 			// Extract the authorization code from the URL
	// 			const authorizationCode = extractAuthorizationCode(newNavState.url);

	// 			// Use the authorization code to exchange for an access token
	// 			exchangeCodeForToken(authorizationCode);
	// 		} else if (newNavState.url.includes("error=")) {
	// 			// Handle error case if user denies access
	// 			console.log(error);
	// 		}
		// }
	// };

	// const authorizationUrl =
	// 	`https://accounts.google.com/o/oauth2/auth` +
	// 	`?client_id=343838702959-qndh7ne6s65mvl24151qdv4p32mh2q20.apps.googleusercontent.com` +
	// 	`&redirect_uri=${encodeURIComponent("http://localhost:19006/")}` +
	// 	`&scope=${encodeURIComponent(
	// 		"https://www.googleapis.com/auth/calendar.events"
	// 	)}` +
	// 	`&response_type=code` +
	// 	`&access_type=offline`;

	return (
		<View>
			<Text>Calendar page will be linked to google calendar api</Text>
		</View>
	// 	<View>
	// 		<WebView
	// 			source={{ uri: authorizationUrl}}
	// 			onNavigationStateChange={handleNavigation}
	// 		/>

	// 	</View>
	);
};

export default Calendar;
