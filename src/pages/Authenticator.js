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
import Register from "../components/Auth/Regiser";

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
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    color: Colors.accent,
    alignItems: "center",
  },
  container: {
    flex: 0.5,
    flexDirection: "row",
    marginBottom: 20,
    marginTop : 30,
    alignItems: "center",
    justifyContent: "center",
  },
  choice1: {
    marginTop: 50,
    height: height / 23,
    width: width / 2.2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DFDDDD",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  choice2: {
    marginTop: 50,
    height: height / 23,
    width: width / 2.2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DFDDDD",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  selec: {
    backgroundColor: "white",
    height: "90%",
    width: "97%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  selecText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  unSelec: {
    backgroundColor: "#DFDDDD",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  unSelecText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  logoContainer: {
    marginTop: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  stretch: {
    width: 170,
    height: 160,
    resizeMode: "stretch",
  },
  footerText: {
    marginTop: 20,
    fontSize: 15,
  },
});
