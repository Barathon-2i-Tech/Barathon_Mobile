/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Colors from "../constants/colors";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

export default function Authenticator({ navigation }) {
  const [choiceForm, setChoiceForm] = useState(false);

  //Change form between login and register
  const handleForm = () => {
    if (!choiceForm) {
      setChoiceForm(true);
    } else {
      setChoiceForm(false);
    }
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.stretch}
          source={require("../../assets/image/logo.jpg")}
        />
      </View>

      <View style={styles.container}>
        <View style={styles.choice1}>
          <Pressable
            onPress={handleForm}
            style={choiceForm ? styles.unSelec : styles.selec}
          >
            <Text style={choiceForm ? styles.unSelecText : styles.selecText}>
              Connexion
            </Text>
          </Pressable>
        </View>
        <View style={styles.choice2}>
          <Pressable
            onPress={handleForm}
            style={!choiceForm ? styles.unSelec : styles.selec}
          >
            <Text style={!choiceForm ? styles.unSelecText : styles.selecText}>
              Inscription
            </Text>
          </Pressable>
        </View>
      </View>

      {!choiceForm ? (
        <Login navigation={navigation} />
      ) : (
        <Register navigation={navigation} />
      )}
    </ScrollView>
  );
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height; //full height

const styles = StyleSheet.create({
  choice1: {
    alignItems: "center",
    backgroundColor: "#DFDDDD",
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    height: height / 23,
    justifyContent: "center",
    marginTop: 50,
    width: width / 2.2,
  },
  choice2: {
    alignItems: "center",
    backgroundColor: "#DFDDDD",
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    height: height / 23,
    justifyContent: "center",
    marginTop: 50,
    width: width / 2.2,
  },
  container: {
    alignItems: "center",
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  footerText: {
    fontSize: 15,
    marginTop: 20,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 130,
  },
  mainContainer: {
    backgroundColor: "#fff",
    flex: 1,
  },
  selec: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    height: "90%",
    justifyContent: "center",
    width: "97%",
  },
  selecText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  stretch: {
    height: 160,
    resizeMode: "stretch",
    width: 170,
  },
  text: {
    alignItems: "center",
    color: Colors.accent,
  },
  unSelec: {
    alignItems: "center",
    backgroundColor: "#DFDDDD",
    borderRadius: 5,
    height: "90%",
    justifyContent: "center",
  },
  unSelecText: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
