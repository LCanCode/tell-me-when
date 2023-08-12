import { View, Text } from 'react-native'
import React from 'react'
import SignUp from "../components/SignUp";
import tw from "twrnc";


const SignUpScreen = () => {

  
  return (
    <View style={tw`p-8 w-full max-w-xs`}>
				<Text style={tw`text-3xl font-bold mb-6 text-white`}>Create Account</Text>
				<SignUp navigation={navigation} />
		</View>
  )
}

export default SignUpScreen