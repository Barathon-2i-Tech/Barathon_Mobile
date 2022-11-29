import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

export default function Example() {
  return (
    <View>
      <Text style={styles.text}>I&apos;m a example</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.accent,
    alignItems: "center",
  },
});
