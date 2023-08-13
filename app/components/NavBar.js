import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const NavBar = () => {
  return (
    <View style={tw` w-100 relative  items-stretch bg-gray-500 pb-1 `}>
      <View style={tw`container px-1  flex flex-wrap items-center `}>
          
      <Text style={tw`text-white text-lg font-semibold ml-4`}>Tell Me When</Text>
        </View>
      </View>
  )
}

export default NavBar