import { View, Text } from "react-native";
import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

const NewCalendar = () => {
	const responseGoogle = (response) => {
		const credential = response.credential;
		axios
			.post(
				"http://localhost:5000/calendar/tokens",
				{ credential },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};
	return (
		<View>
			<GoogleOAuthProvider clientId="343838702959-t8v6qujcdqjddsfnmlrussncl8h47hcq.apps.googleusercontent.com">
				<GoogleLogin
					buttonText="Sign in and Authorize Calendar"
					onSuccess={responseGoogle}
					onFailure={(error) => {
						console.log(error);
					}}
					responseType="code"
					accessType="offline"
					scope="openid email profile https://www.googleapis.com/auth/calendar"
				/>
			</GoogleOAuthProvider>
		</View>
	);
};

export default NewCalendar;
