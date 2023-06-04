/* eslint-disable react/prop-types */

import { StyleSheet, Image, View, Dimensions, Text, Pressable } from "react-native";
import Colors from "../constants/colors";
import React, { useEffect, useState } from "react";
import { getDataObject } from "../constants/localStorage";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Dashboard({ navigation }) {

  const [user, setUser] = useState({});
  const [load, setLoad] = useState(false);

  async function setDatas() {
    getDataObject("user").then((res) => {
      setUser(res);
      setLoad(true);
    });
  }

  useEffect(() => {
    setDatas();
  }, []);

  const goToCondition = () => {
    navigation.navigate("Condition");
  }

  return (
    <View>
      {load == true && (
        <>
        <View style={styles.container}>
          <Image
              style={styles.stretch}
              // eslint-disable-next-line no-undef
              source={require("../../assets/image/barathonien.png")}
            />
            <Text style={styles.name}>{user.userLogged.first_name} {user.userLogged.last_name}</Text>
            <Text>{user.userLogged.email}</Text>
            <View style={styles.mainContainer}>
              <View style={styles.caseTopOne}>
                <View style={styles.icon}>
                  <Ionicons name="person" size={25} color="#000000" iconStyle={{ marginLeft: 20 }} />
                </View>
                <Text style={styles.title}>Mon profil</Text>
              </View>
              <View style={styles.caseTopTwo}>
                <View style={styles.icon}>
                  <Ionicons name="calendar" size={25} color="#000000" iconStyle={{ marginLeft: 20 }} />
                </View>
                <Text style={styles.title}>Mes evènnements</Text>
              </View>

              <View style={styles.caseOne}>
                <View style={styles.icon}>
                  <Ionicons name="qr-code-sharp" size={25} color="#000000" iconStyle={{ marginLeft: 20 }} />
                </View>
                <Text style={styles.title}>Mes tickets</Text>
              </View>
              <View style={styles.caseTwo}>
                <View style={styles.icon}>
                  <Ionicons name="settings-sharp" size={25} color="#000000" iconStyle={{ marginLeft: 20 }} />
                </View>
                <Text style={styles.title}>parametres</Text>
              </View>


              <Pressable onPress={goToCondition} style={styles.caseBotOne}>
                <View style={styles.icon}>
                  <Ionicons name="ios-checkmark-circle-sharp" size={25} color="#000000" iconStyle={{ marginLeft: 20 }} />
                </View>
                <Text style={styles.title}>Conditions d&apos;utilisation</Text>
              </Pressable>

              <View style={styles.caseBotTwo}>
                <View style={styles.icon}>
                  <Ionicons name="mail" size={25} color="#000000" iconStyle={{ marginLeft: 20 }} />
                </View>
                <Text style={styles.title}>Nous contacter</Text>
              </View>

            </View>
        </View>

        </>
      )}


    </View>
  );
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  text: {
    color: Colors.accent,
    alignItems: "center",
  },

  title: {
    textAlign: 'center',
  },

  icon : {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop : 40,
  },
  stretch: {
    width: 180,
    height: 180,
    resizeMode: "stretch",
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop : height / 9,
  },

  name: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop : 10,
  },







  mainContainer: {
    marginTop : 20,
    backgroundColor: '#EBEBEB',
    width : width / 1.2,
    height: height / 2,
    borderRadius:10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  caseOne: {
    backgroundColor: '#EBEBEB',
    width : "50%",
    height : "33%",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor : '#D4D4D4',
  },

  caseTwo: {
    backgroundColor: '#EBEBEB',
    width : "50%",
    height : "33%",
    borderBottomWidth: 1,
    borderColor : '#D4D4D4',
  },

  caseTopOne: {
    backgroundColor: '#EBEBEB',
    width : "50%",
    height : "33%",
    borderTopLeftRadius: 10,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor : '#D4D4D4',
  },

  caseBotTwo: {
    backgroundColor: '#EBEBEB',
    width : "50%",
    height : "33%",
    borderBottomRightRadius: 10,
    borderColor : '#D4D4D4',
  },

  caseBotOne: {
    backgroundColor: '#EBEBEB',
    width : "50%",
    height : "33%",
    borderBottomLeftRadius: 10,
    borderRightWidth: 1,
    borderColor : '#D4D4D4',
  },

  caseTopTwo: {
    backgroundColor: '#EBEBEB',
    width : "50%",
    height : "33%",
    borderTopRightRadius: 10,
    borderBottomWidth: 1,
    borderColor : '#D4D4D4',
  },

});
