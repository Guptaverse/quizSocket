

import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Socket } from 'socket.io-client';
const ChatScreen = ({ navigation, route }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const socket = route.params?.socket; 
  const roomId = route.params?.roomId; 

  const closeChatScreen = () => {
    navigation.goBack();
  };

  const handleSendMessage = (message) => {
      const updatedChatHistory = [...chatHistory, message];
      setChatHistory(updatedChatHistory);
      socket.emit('message', { roomId: roomId, text: inputMessage });
    
  };
  useEffect(() => {
    socket.on('newMessage', (message) => {
      const updatedChatHistory = [...chatHistory, message];
      setChatHistory(updatedChatHistory);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [chatHistory, socket]);
//  const handleSend =()=>{
//     socket.emit('message', { roomId: roomId, text: inputMessage });
//  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={closeChatScreen}>
        <Text>Close</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.chatContainer}>
        {chatHistory.map((message, index) => (
          <View key={index} style={styles.messageBubble}>
            <Text>{message}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          placeholder="Type a message"
          onChangeText={(text) => setInputMessage(text)}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => {
            handleSendMessage(inputMessage);
            setInputMessage(''); 
          }}
        >
          <Text >Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 10,
    backgroundColor: 'lightred',
    padding: 10,
    borderRadius: 50,
  },
  chatContainer: {
    flex: 1,
    marginTop: 20,
    width: '100%',
  },
  messageBubble: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '80%',
  },
  sendButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
});

export default ChatScreen;
