/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

import { StyleSheet, Text, View, Image } from "react-native";

export default function Header({user}) {
  return (
    <View style={styles.container}>
        <Image
          style={styles.stretch}
          source={require("../../../assets/image/barathonien.png")}
        />
      <View style={styles.containerText}>
        <Text style={styles.textHey}>Hey</Text>
        <Text style={styles.name}>{user.userLogged.first_name} {user.userLogged.last_name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    flexDirection: "row",
    marginTop : 50,
  },
  containerText : {
    marginTop : 10,
  },
  textHey : {
    marginTop : 10,
    fontSize : 10,
    color : 'grey',
  },
  name : {
    fontSize : 20,
    fontWeight: 'bold'
  },
  stretch: {
    width: 70,
    height: 70,
    resizeMode: "stretch",
  },
});
