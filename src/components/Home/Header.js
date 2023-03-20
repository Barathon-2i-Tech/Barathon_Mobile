/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

import { StyleSheet, Text, View, Image } from "react-native";

export default function Header({ user }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.stretch}
        source={require("../../../assets/image/barathonien.png")}
      />
      <View style={styles.containerText}>
        <Text style={styles.textHey}>Hey</Text>
        <Text style={styles.name}>
          {user.userLogged.first_name} {user.userLogged.last_name}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 50,
  },
  containerText: {
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  stretch: {
    height: 70,
    resizeMode: "stretch",
    width: 70,
  },
  textHey: {
    color: "grey",
    fontSize: 10,
    marginTop: 10,
  },
});
