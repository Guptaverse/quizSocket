import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/quiz.png")} style={styles.image} />
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("teacher")}>
          <Text style={styles.buttonText}>Teacher</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("join")}>
          <Text style={styles.buttonText}>Student</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200, 
    height: 200, 
    resizeMode: "contain", 
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  button: {
    marginTop: 300,
    marginLeft:30,
    backgroundColor: "red",
    padding: 10,
    width: 100,
    borderRadius: 5,
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default OnboardingScreen;
