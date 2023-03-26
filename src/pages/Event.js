/* eslint-disable react/prop-types */

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import Axios from "../constants/axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import MapView from "react-native-maps";

export default function Event({ route }) {
  const { event_id, user, navigation } = route.params;
  const [event, setEvent] = useState({});
  const [load, setLoad] = useState(false);
  const [more, setMore] = useState(false);
  const [place, setPlace] = useState(false);
  const [booking, setBooking] = useState(0);

  const savePlace = async () => {
    Axios.api
      .post(
        "/barathonien/booking",
        {
          user_id: user.userLogged.user_id,
          event_id: event_id,
          isFav: false,
        },
        {
          headers: {
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
            Authorization: "Bearer " + user.token,
          },
        }
      )
      .then((response) => {
        setBooking(response.data.data.booking.booking_id);
        setPlace(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const cancelPlace = async () => {
    Axios.api
      .delete("/barathonien/booking/" + booking + "/", {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then(() => {
        setBooking(0);
        setPlace(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function setData() {
    Axios.api
      .get(
        "/barathonien/event/" +
          event_id +
          "/user/" +
          user.userLogged.user_id +
          "/",
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      )
      .then((response) => {
        setEvent(response.data.data.event[0]);
        setLoad(true);
        if (response.data.data.booking.length == 0) {
          setPlace(false);
          setBooking(0);
        } else {
          setPlace(true);
          setBooking(response.data.data.booking[0].booking_id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    setData();
  }, []);

  return (
    <ScrollView style={styles.mainContainer}>
      {load == true && (
        <>
          <ImageBackground
            source={{ uri: event.poster }}
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

            <Text style={styles.title}>{event.event_name}</Text>
          </ImageBackground>
          <View style={styles.littleInfo}>
            <View style={styles.info}>
              <View style={styles.infoLogo}>
                <Ionicons
                  name="calendar"
                  size={25}
                  color="#FFFFFF"
                  iconStyle={styles.margin}
                />
              </View>
              <Text style={styles.textInfo}>
                {moment(event.start_event)
                  .tz("Europe/Paris")
                  .format("dddd DD MMMM Y, HH") + "H"}{" "}
                à{" "}
                {moment(event.end_event).tz("Europe/Paris").format("HH") + "H"}
              </Text>
            </View>
            <View style={styles.info}>
              <View style={styles.infoLogo}>
                <Ionicons
                  name="map"
                  size={25}
                  color="#FFFFFF"
                  iconStyle={styles.margin}
                />
              </View>
              <Text style={styles.textInfo}>
                {event.establishments.address.address},{" "}
                {event.establishments.address.postal_code}{" "}
                {event.establishments.address.city}
              </Text>
            </View>

            <View style={styles.info}>
              <View style={styles.infoLogo}>
                <Ionicons
                  name="pricetag"
                  size={25}
                  color="#FFFFFF"
                  iconStyle={styles.margin}
                />
              </View>
              <Text style={styles.textInfo}>{event.price} €</Text>
            </View>
            <View style={styles.info}>
              <View style={styles.infoLogo}>
                <Ionicons
                  name="person"
                  size={25}
                  color="#FFFFFF"
                  iconStyle={styles.margin}
                />
              </View>
              <Text style={styles.textInfo}>
                {event.establishments.trade_name}
              </Text>
            </View>

            {!more ? (
              <View style={styles.infoBtn}>
                <Pressable
                  onPress={() => {
                    setMore(true);
                  }}
                  style={styles.buttonMore}
                >
                  <Text style={styles.textMore}>Plus d&apos;information</Text>
                </Pressable>
                {!place ? (
                  <Pressable onPress={savePlace} style={styles.buttonReserv}>
                    <Text style={styles.textReserv}>Reserver ma place</Text>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={cancelPlace}
                    style={styles.buttonReservCancel}
                  >
                    <Text style={styles.textReservCancel}>
                      Annuler ma place
                    </Text>
                  </Pressable>
                )}
              </View>
            ) : (
              <View></View>
            )}
          </View>

          {!more ? (
            <View></View>
          ) : (
            <View style={styles.moreInfo}>
              <Text style={styles.titleMore}>Details</Text>
              <Text style={styles.contentMore}>{event.description}</Text>

              <Text style={styles.titleMore}>Lieu</Text>
              <View style={styles.container}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: 45.764043,
                    longitude: 4.835659,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                ></MapView>
              </View>
              <Text style={styles.contentMore}>
                {event.establishments.address.address},{" "}
                {event.establishments.address.postal_code}{" "}
                {event.establishments.address.city}
              </Text>

              <Text style={styles.titleMore}>Organisateur</Text>

              <View style={styles.orgaCont}>
                <Image
                  style={styles.stretch}
                  source={{ uri: event.establishments.logo }}
                />
                <View>
                  <Text style={styles.contentMore}>
                    {event.establishments.trade_name}
                  </Text>
                  <Text style={styles.contentMore}>
                    {event.establishments.phone}
                  </Text>
                </View>
              </View>

              <View style={styles.infoBtn2}>
                <Text style={styles.contentMore}>{event.price} €</Text>
                {!place ? (
                  <Pressable onPress={savePlace} style={styles.buttonReserv}>
                    <Text style={styles.textReserv}>Reserver ma place</Text>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={cancelPlace}
                    style={styles.buttonReservCancel}
                  >
                    <Text style={styles.textReservCancel}>
                      Annuler ma place
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const white = "white";
const bgBtnReserv = "#FC1055";
const bgBtnReservCancel = "#FDBA74";
const blackBg = "#0B0D1B";

const styles = StyleSheet.create({

  back: {
    marginTop: 20,
  },

  buttonMore: {
    backgroundColor: white,
    borderRadius: 10,
    width: width / 2.5,
  },

  buttonReserv: {
    backgroundColor: bgBtnReserv,
    borderRadius: 10,
    width: width / 2.5,
  },
  
  buttonReservCancel: {
    backgroundColor: bgBtnReservCancel,
    borderRadius: 10,
    width: width / 2.5,
  },

  container: {
    flex: 1,
    height: 100,
    padding: 10,
    width: width / 1.1,
  },

  contentMore: {
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

  infoBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoBtn2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },

  littleInfo: {
    backgroundColor: blackBg,
    height: height / 3,
    padding: 10,
  },

  mainContainer: {
    backgroundColor: blackBg,
  },

  map: {
    height: "100%",
    width: "100%",
  },

  margin: {
    marginTop : 10
  },

  moreInfo: {
    backgroundColor: white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  orgaCont: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },

  stretch: {
    borderRadius: 100,
    height: 90,
    overflow: "hidden",
    resizeMode: "stretch",
    width: 90,
  },

  textInfo: {
    color: white,
    fontSize: 15,
    paddingLeft: 20,
  },

  textMore: {
    color: bgBtnReserv,
    fontWeight: "bold",
    paddingLeft: 18,
    paddingTop: 14,
  },

  textReserv: {
    color: white,
    fontWeight: "bold",
    paddingLeft: 18,
    paddingTop: 14,
  },

  textReservCancel: {
    color: white,
    fontWeight: "bold",
    paddingLeft: 22,
    paddingTop: 14,
  },

  title: {
    color: white,
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 30,
    marginTop: height / 1.8,
  },

  titleMore: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 30,
    padding: 10,
  },
});
