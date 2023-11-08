import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import io from 'socket.io-client';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [studentName, setStudentName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [socket, setSocket] = useState(null);

  const handleJoin = () => {
    const newSocket = io('http://127.0.0.1:4000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      axios.post("http://127.0.0.1:4000/quiz/get", { studentName, roomId })
        .then((res) => {
          if (res.data.quizData) {
            console.log(res.data.quizData);

            if (res.data.roomId === roomId && newSocket) {
              newSocket.emit('joinRoom', { roomId, studentName });
              navigation.navigate('student', {
                data: res.data.quizData,
                roomId:res.data.roomId,
                socket:newSocket
              });
            } else {
              Alert.alert("Wrong RoomID");
              newSocket.disconnect();
            }
          }
        })
        .catch((err) => {
          Alert.alert("Error", "There was an error joining the room.");
          newSocket.disconnect();
        });
    });
  };

  return (
    <View style={styles.container}>
      <Text>Student Name:</Text>
      <TextInput
        style={styles.input}
        value={studentName}
        onChangeText={setStudentName}
        placeholder="Enter your name"
      />
      <Text>Quiz ID:</Text>
      <TextInput
        style={styles.input}
        value={roomId}
        onChangeText={setRoomId}
        placeholder="Enter the quiz ID"
      />
      <Button title="Join" onPress={handleJoin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default LoginScreen;
