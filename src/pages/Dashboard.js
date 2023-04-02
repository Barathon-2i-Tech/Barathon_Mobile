import { StyleSheet, Image, View, Dimensions, Text } from "react-native";
import Colors from "../constants/colors";
import React, { useEffect, useState } from "react";
import { getDataObject } from "../constants/localStorage";

export default function Dashboard() {

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
                <Text>Mon profil</Text>
              </View>
              <View style={styles.caseTopTwo}>
                <Text>Mes evènnements</Text>
              </View>

              <View style={styles.caseOne}>
                <Text>Mes tickets</Text>
              </View>
              <View style={styles.caseTwo}>
                <Text>parametres</Text>
              </View>

              <View style={styles.caseBotOne}>
                <Text>Conditions d&apos;utilisation</Text>
              </View>
              <View style={styles.caseBotTwo}>
                <Text>Nous contacter</Text>
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
