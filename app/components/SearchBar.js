import { View, TextInput, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const SearchBar = () => {

  const handleSubmitSearch = () => {
    // logic to submit a search
  }
  return (
    <View style={tw`bg-gray-400 h-screen px-10 py-auto w-96`}>
      <TextInput>SearchBar</TextInput>
    </View>
  )
}

export default SearchBar