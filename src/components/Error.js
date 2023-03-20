/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

export default function Example({ error }) {
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
  logoContainer: {
    justifyContent: "center",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    width: width / 2,
  },
  stretch: {
    height: 160,
    width: 170,
  },
  text: {
    color: "black",
    justifyContent: "center",
    marginTop: "20%",
    textAlign: "center",
  },
});
