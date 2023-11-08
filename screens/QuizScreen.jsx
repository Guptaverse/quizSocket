import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Alert} from 'react-native';
import ChatScreen from './ChatScreen';

const QuizScreen = ({route}) => {
  const quizData = route.params?.data;
  const roomId = route.params?.roomId;
  const socket = route.params?.socket;
  const questions = quizData
//   Alert.alert(questions)
  console.log(questions)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [isEliminated, setIsEliminated] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = () => {
    if (selectedOption === currentQuestion.answer) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption('');
        setIsEliminated(false);
      }
    } else {
      setIsEliminated(true);
      socket.emit('leaveRoom', roomId);
    }
  };

  return (
    <View style={styles.container}>
      {isEliminated ? (
        <Text style={styles.eliminatedText}>You are Eliminated</Text>
      ) : (
        <>
          <Text style={styles.question}>{currentQuestion.question}</Text>
          {currentQuestion.options.map((option, index) => (
            <View key={index}>
              <Button
                title={option}
                onPress={() => setSelectedOption(option)}
                disabled={selectedOption !== '' || isEliminated}
              />
            </View>
          ))}
          <Button title="Submit Answer" onPress={handleAnswer} disabled={selectedOption === '' || isEliminated} />
          <ChatScreen />
        </>
      )}
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
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  eliminatedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default QuizScreen;
