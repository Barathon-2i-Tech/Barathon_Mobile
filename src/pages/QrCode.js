import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

export default function QrCode() {
  return (
    <View>
      <Text style={styles.text}>NOTIFICATIONS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    alignItems: "center",
    color: Colors.accent,
  },
});