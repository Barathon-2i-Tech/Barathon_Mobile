/* eslint-disable react/prop-types */
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import Axios from "../constants/axios";
import { useEffect, useState } from "react";
import { getDataObject } from "../constants/localStorage";
import QRCode from "react-native-qrcode-svg";

export default function Ticket({ navigation }) {
  const [user, setUser] = useState({});
  const [eventsBook, setEventsBook] = useState({});
  const [load, setLoad] = useState(false);

  //get user and barathonien event 's
  async function setDatas() {
    getDataObject("user").then((res) => {
      setUser(res);
      Axios.api
        .get("/barathonien/" + res.userLogged.user_id + "/booking/events", {
          headers: {
            Authorization: "Bearer " + res.token,
          },
        })
        .then((response) => {
          setEventsBook(response.data.data.bookings);
          setLoad(true);
        })
        .catch((error) => {
          console.log({error});
        });
    });
  }

  const goToEvent = (event_id) => {
    navigation.navigate("Event", {
      event_id: event_id,
      user: user,
      navigation: navigation,
    });
  };

  const goToQr = (URL) => {
    navigation.navigate("QrCode", { url: URL, navigation: navigation });
  };

  useEffect(() => {
    setDatas();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Mes Billets</Text>
        </View>

        {load == true && (
          <>
            {Object.keys(eventsBook).map((key) => {
              return (
                <View key={key}>
                  {eventsBook[key].map((event) => {
                    const URL =
                      "http://127.0.0.1:5173/pro/event/" +
                      event.event.event_id +
                      "/barathonien/" +
                      user.userLogged.barathonien_id;
                    return (
                      <View key={event.event_id} style={styles.containerQr}>
                        <View>
                          <Pressable
                            onPress={() => {
                              goToEvent(event.event.event_id);
                            }}
                          >
                            <Text>{event.event.event_name}</Text>
                            <Text>{event.event.start_event}</Text>
                          </Pressable>
                        </View>

                        <View>
                          <Pressable
                            onPress={() => {
                              goToQr(URL);
                            }}
                          >
                            <QRCode value={URL} />
                          </Pressable>
                        </View>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const grey = "#CFCFCF";
const white = "white";
const black = "black";

const styles = StyleSheet.create({
  containerQr: {
    alignItems: "center",
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "8%",
    marginTop: 50,
    paddingBottom: 20,
    width: width / 1.2,
  },

  header: {
    backgroundColor: white,
    borderBottomColor: grey,
    borderBottomWidth: 1,
    height: height / 9,
    width: "100%",
  },

  title: {
    color: black,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "12%",
    textAlign: "center",
  },
});
