/* eslint-disable react/prop-types */

import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

export default function EventsByCategory({route}) {
    const { category } = route.params;

  return (
    <View>
      <Text style={styles.text}>UNE CATEGORY : {category.category_id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.accent,
    alignItems: "center",
  },
});
