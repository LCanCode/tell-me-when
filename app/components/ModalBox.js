import React, {useState} from 'react';
import {Alert, Modal, Text, Pressable, View, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

const ModalBox = ({ isOpen, closeModal, title, description, content }) => {
  
  return (
    // <View style={tw`flex-1 content-center align-center mt-5 bg-white`}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={closeModal}>
          
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{title}</Text>
          <Text style={{ fontSize: 14, color: '#888', marginBottom: 20 }}>{description}</Text>
          {content}
          <TouchableOpacity onPress={closeModal} style={{ marginTop: 20 }}>
            <Text style={{ color: 'blue' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


export default ModalBox


