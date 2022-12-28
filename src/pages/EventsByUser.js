import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

export default function EventsByUser() {
  return (
    <View>
      <Text style={styles.text}>EVENTS DU USER WTFFFFF</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.accent,
    alignItems: "center",
  },
});
