import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, KeyboardAvoidingView,Alert } from 'react-native';
import axios from 'axios';
const TeacherScreen = ({navigation}) => {
  const [questions, setQuestions] = useState([]);
  const [quizData, setquizData] = useState([]);
  const [roomId,setRoomId] = useState();

  const addQuestion = () => {
    const newQuestion = { question: '', options: ['', '', '', ''], answer: '' };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };
  const handleChat=()=>{
      navigation.navigate('ChatScreen');
  }
  const savequizData = () => {
    setquizData(questions);
    setQuestions([]); 
    // console.log('Form Data:', questions);
    axios.post("http://127.0.0.1:4000/quiz/create",{quizData:questions})
    .then((res)=>{
        if(res.status===200){
            Alert.alert("Quiz created successfully,scroll down for RoomID")
            setRoomId(res.data.roomId)
        }

    }).catch((err)=>{
        Alert.alert("Something Went Wrong :(")
        console.log(err)
    })
  };

  return (
    <KeyboardAvoidingView >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Quiz</Text>
        {questions.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Question {index + 1}</Text>
              <Button title="Delete" onPress={() => deleteQuestion(index)} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter the question"
              value={question.question}
              onChangeText={(text) => updateQuestion(index, 'question', text)}
            />
            <Text>Options:</Text>
            {question.options.map((option, optionIndex) => (
              <TextInput
                key={optionIndex}
                style={styles.input}
                placeholder={`Option ${optionIndex + 1}`}
                value={option}
                onChangeText={(text) =>
                  updateQuestion(index, 'options', [
                    ...question.options.slice(0, optionIndex),
                    text,
                    ...question.options.slice(optionIndex + 1),
                  ])
                }
              />
            ))}
            <TextInput
              style={styles.input}
              placeholder="Enter the correct answer"
              value={question.answer}
              onChangeText={(text) => updateQuestion(index, 'answer', text)}
            />
          </View>
        ))}
        <View style={styles.btnWrapper}>
            <Button title="Add Question" onPress={addQuestion} />
            <Button title="Save" onPress={savequizData} />
        </View>
        <Text style={styles.savedData}>Saved Data:</Text>
        {quizData.map((data, index) => (
          <View key={index}>
            <Text>{`Question ${index + 1}: ${data.question}`}</Text>
            <Text>{`Options: ${data.options.join(', ')}`}</Text>
            <Text>{`Answer: ${data.answer}`}</Text>
          </View>
        ))}
        <Text>{roomId}</Text>
      </ScrollView>
      <Button title="Chat" onPress={handleChat} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  savedData: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  btnWrapper:{
    display:'flex',
    flexDirection:"row",
    justifyContent:"space-around",

  },
});

export default TeacherScreen;
