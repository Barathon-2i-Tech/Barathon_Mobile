import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

export default function Example() {
  return (
    <View>
      <Text style={styles.text}>SEARCH EVENT</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.accent,
    alignItems: "center",
  },
});
