/* eslint-disable react/prop-types */

import { StyleSheet, Text, View, Pressable } from "react-native";
import Colors from "../constants/colors";
import { useState, useEffect } from 'react';
import { getDataObject } from "../constants/localStorage";

export default function Example({ navigation }) {

  const [user, setUser] = useState({});

  async function setDatas() {
    getDataObject("user").then((res) => {
      setUser(res);
    });
  }


useEffect(() => {
    setDatas();
}, []);



  const handleSubmit = () => {
    navigation.navigate("Profile", {
      user: user,
      navigation: navigation,
    });
  }

  return (
    <View>
      <Text style={styles.text}>DASHBOARD</Text>
      <Pressable onPress={handleSubmit}>
        <Text style={styles.text}>PROFILE BARATHONIEN</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    alignItems: "center",
    color: Colors.accent,
  },
});
