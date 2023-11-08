import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity,StyleSheet, Button } from 'react-native';



const StudentScreen = ({ navigation ,route}) => {
  const [timeLeft, setTimeLeft] = useState(5); 
  const quizData = route.params?.data;
  const socket = route.params?.socket;
  // typeof(quizData);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(interval);
        // Time's up, navigate to the quiz screen
        navigation.navigate('QuizScreen',{data:quizData});
      }
    }, 1000); 
    return () => clearInterval(interval);
  }, [timeLeft, navigation]);
  const openChatScreen = () => {
    navigation.navigate('ChatScreen',{socket:socket});
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text>Countdown to Quiz Start:</Text>
      <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      <Button title="Start Quiz" onPress={() => navigation.navigate('QuizScreen',{data:quizData})} disabled={timeLeft > 0} />

      <TouchableOpacity style={styles.chatButton} onPress={openChatScreen}>
        <Text>Open Chat</Text>
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chatButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 50,
  },
});

export default StudentScreen;