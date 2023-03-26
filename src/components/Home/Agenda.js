/* eslint-disable react/prop-types */

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment-timezone";
moment.locale();

export default function Agendas({ navigation, events, user }) {
  const handleSubmit = (event_id) => {
    navigation.navigate("Event", {
      event_id: event_id,
      user: user,
      navigation: navigation,
    });
  };

  return (
    <View style={styles.container}>
      {Object.keys(events).map((key) => {
        return (
          <View key={key}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>{key}</Text>
              <View>
                <Ionicons name="calendar" size={30} color="red" />
              </View>
            </View>
            {events[key].map((eventBook) => {
              return (
                <Pressable
                  key={eventBook.event_id}
                  onPress={() => {
                    handleSubmit(eventBook.event.event_id);
                  }}
                >
                  <View style={styles.containerEvent}>
                    <ImageBackground
                      source={{ uri: eventBook.event.poster }}
                      resizeMode="cover"
                      style={styles.image}
                    >
                      <Text style={styles.date}>
                        {moment(eventBook.event.start_event)
                          .tz("Europe/Paris")
                          .format("dddd MMM YY, HH") + "H"}
                      </Text>
                      <Text style={styles.title}>
                        {eventBook.event.event_name}
                      </Text>
                      <View style={styles.infoContainer}>
                        <Ionicons
                          name="pricetag"
                          size={15}
                          color="#DDDDDD"
                          iconStyle={styles.icon}
                        />
                        <Text style={styles.info}>
                          {eventBook.event.price} €
                        </Text>
                      </View>
                    </ImageBackground>
                  </View>
                </Pressable>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const width = Dimensions.get("window").width;
const white = "white";
const black = "black";
const bkColor = "rgba(52, 52, 52, 0.7)";
const bkColor2 = "rgba(52, 52, 52, 0.5)";
const colorContainer = "#DDDDDD";
const styles = StyleSheet.create({
  container: {
    marginLeft: "2%",
    marginTop: "3%",
    width: width / 1.1,
  },

  date: {
    backgroundColor: bkColor,
    color: white,
    marginTop: "37%",
    paddingLeft: 10,
    paddingTop: 10,
    textShadowColor: black,
    textShadowRadius: 4,
  },

  header: {
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },

  headerTitle: {
    fontSize: 20,
  },

  icon : {
    marginTop: 10,
  },

  image: {
    borderRadius: 20,
    flex: 1,
    height: 220,
    justifyContent: "center",
    marginBottom: 40,
    overflow: "hidden",
  },
  info: {
    color: white,
    fontSize: 15,
    paddingLeft: 10,
    textShadowColor: black,
    textShadowRadius: 4,
  },

  infoContainer: {
    backgroundColor: bkColor2,
    color: colorContainer,
    flex: 1,
    flexDirection: "row",
    paddingLeft: 10,
    textShadowColor: black,
    textShadowRadius: 4,
  },
  title: {
    backgroundColor: bkColor,
    color: white,
    fontSize: 20,
    paddingLeft: 10,
    textShadowColor: black,
    textShadowRadius: 4,
  },
});
