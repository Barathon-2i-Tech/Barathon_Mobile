import { StyleSheet, View, Pressable } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function QrCode({ route }) {
  const { url, navigation } = route.params;

  return (
    <View>
      <View style={styles.back}>
        <Pressable
          onPress={() => {
            navigation.navigate("HomeStack");
          }}
        >
          <Ionicons
            name="arrow-back"
            size={30}
            color="black"
            iconStyle={styles.margin}
          />
        </Pressable>
      </View>

      <View style={styles.qrCodeContainer}>
        <QRCode value={url} size={300} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    marginTop: 50,
  },

  qrCodeContainer: {
    alignSelf: "flex-start",
    marginTop: 100,
    marginLeft: 50,
  },
});
