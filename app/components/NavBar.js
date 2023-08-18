import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const NavBar = () => {
  return (
    <View style={tw`relative bg-orange-100 pb-1`}>
      <View style={tw` px-2 items-center `}>
        <Text style={tw`text-cyan-700 self-center text-xl font-semibold `}>Tell Me When</Text>
      </View>
    </View>
  )
}

export default NavBar