/* eslint-disable no-undef */

import { StyleSheet, Text, View, Image, Dimensions, } from "react-native";
import Colors from "../constants/colors";

export default function Example({error}) {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>{error}</Text>
      <View style={styles.logoContainer}>
        <Image
          style={styles.stretch}
          source={require("../../assets/image/sad.png")}
        />
      </View>
    </View>
  );
}

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  text: {
    color: 'black',
    marginTop : '20%',
    textAlign: "center",
    justifyContent: "center",
  },
  mainContainer : {
    flex : 1,
    flexDirection: "row",
    width : width / 2,
  },
  logoContainer: {
    justifyContent: "center",
    
  },
  stretch: {
    width: 170,
    height: 160,
  },
});