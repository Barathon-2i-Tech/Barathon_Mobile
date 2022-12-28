/* eslint-disable react/prop-types */

import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

export default function Event({route}) {
    const { event_id } = route.params;

  return (
    <View>
      <Text style={styles.text}>UN EVENT : {event_id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.accent,
    alignItems: "center",
  },
});
