import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import OnboardingScreen from './screens/OnboardingScreen';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import TeacherScreen from './screens/TeacherScreen';
import StudentScreen from './screens/StudentScreen';
import QuizScreen from './screens/QuizScreen';
import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={OnboardingScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="teacher"
          component={TeacherScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="student"
          component={StudentScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="QuizScreen"
          component={QuizScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="join"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="ChatScreen"
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
