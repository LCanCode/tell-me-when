import {
	View,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import GoogleSignIn from "../components/GoogleSignIn";

const LoginScreen = ({ navigation }) => {

  return (
		<View>
			<View>
				<SignUp navigation={navigation} />
			</View>
			<View>
				<SignIn navigation={navigation} />
			</View>
			<View>
				<GoogleSignIn navigation={navigation} />
			</View>
		</View>
	);
};

export default LoginScreen;
