/* eslint-disable react/prop-types */

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ImageBackground,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Carousel from "../components/Home/Carousel";

export default function Establishment({ route }) {
  const { establishment, user, navigation } = route.params;

  return (
    <ScrollView style={styles.mainContainer}>
      <ImageBackground
        source={{ uri: establishment.logo }}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.back}>
          <Pressable
            onPress={() => {
              navigation.navigate("HomeStack");
            }}
          >
            <Ionicons
              name="arrow-back"
              size={30}
              color="#FFFFFF"
              iconStyle={styles.margin}
            />
          </Pressable>
        </View>

        <Text style={styles.title}>{establishment.trade_name}</Text>
      </ImageBackground>
      <View style={styles.establishmentContainer}>
        <View style={styles.info}>
          <View style={styles.infoLogo}>
            <Ionicons
              name="ios-phone-portrait-outline"
              size={25}
              color="#FFFFFF"
              iconStyle={styles.margin}
            />
          </View>

          <Text style={styles.textInfo}>{establishment.phone}</Text>
        </View>
        <View style={styles.info}>
          <View style={styles.infoLogo}>
            <Ionicons
              name="mail"
              size={25}
              color="#FFFFFF"
              iconStyle={styles.margin}
            />
          </View>

          <Text style={styles.textInfo}>{establishment.email}</Text>
        </View>

        <View style={styles.info}>
          <View style={styles.infoLogo}>
            <Ionicons
              name="logo-google"
              size={25}
              color="#FFFFFF"
              iconStyle={styles.margin}
            />
          </View>

          <Text style={styles.textInfo}>{establishment.website}</Text>
        </View>

        <View style={styles.info}>
          <View style={styles.infoLogo}>
            <Ionicons
              name="calendar"
              size={25}
              color="#FFFFFF"
              iconStyle={styles.margin}
            />
          </View>

          <Text style={styles.textInfo}>Ouverture</Text>
        </View>

        <View style={styles.opening}>
          <Text style={styles.desc}>Lundi : {establishment.opening.Lundi}</Text>

          <Text style={styles.desc}>Mardi : {establishment.opening.Mardi}</Text>

          <Text style={styles.desc}>
            Mercredi : {establishment.opening.Mercredi}
          </Text>

          <Text style={styles.desc}>Jeudi : {establishment.opening.Jeudi}</Text>

          <Text style={styles.desc}>
            Vendredi : {establishment.opening.Vendredi}
          </Text>

          <Text style={styles.desc}>
            Samedi : {establishment.opening.Samedi}
          </Text>

          <Text style={styles.desc}>
            Dimanche : {establishment.opening.Dimanche}
          </Text>
        </View>
            <Carousel
            DATA={establishment.events}
            navigation={navigation}
            user={user}
            ></Carousel>
      </View>
    </ScrollView>
  );
}

//const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const white = "white";
const blackBg = "#0B0D1B";
const styles = StyleSheet.create({
  back: {
    marginTop: 20,
  },

  desc: {
    color: white,
    textAlign: "center",
  },

  establishmentContainer: {
    backgroundColor: blackBg,
    borderBottomWidth: 1,
    borderTopLeftRadius : 10,
    borderTopRightRadius : 10,
    padding: 10,
  },

  image: {
    height: height / 1.4,
    padding: 10,
  },

  info: {
    flex: 1,
    flexDirection: "row",
  },

  mainContainer: {
    backgroundColor: blackBg,
  },

  margin: {
    marginTop: 10,
  },

  

  opening: {
    marginTop: 20,
  },

  textInfo: {
    color: white,
    fontSize: 15,
    paddingLeft: 20,
  },

  title: {
    color: white,
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 30,
    marginTop: height / 1.8,
  },
});
