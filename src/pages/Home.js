/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

import {
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { getDataObject } from "../constants/localStorage";
import React, { useEffect, useState } from "react";
import Header from "../components/Home/Header";
import Carousel from "../components/Home/Carousel";
import CarouselTags from "../components/Home/CarouselTags";
import Error from "../components/Error";
import Axios from "../constants/axios";
import Agenda from "../components/Home/Agenda";

export default function Home({ navigation }) {
  const [user, setUser] = useState({});
  const [events, setEvents] = useState({});
  const [eventsBook, setEventsBook] = useState({});
  const [tags, setTags] = useState({});
  const [load, setLoad] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setDatas();
  }, []);

  async function getTopTags(user) {
    Axios.api
      .get("/barathonien/top/categories", {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        setTags(response.data.data.categories);
        getEventBooking(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getEventBooking(user) {
    Axios.api
      .get("/barathonien/" + user.userLogged.user_id + "/booking/events", {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        setEventsBook(response.data.data.bookings);
        setLoad(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function setDatas() {
    getDataObject("user").then((res) => {
      setUser(res);
      Axios.api
        .get("/barathonien/" + res.userLogged.user_id + "/city/events", {
          headers: {
            Authorization: "Bearer " + res.token,
          },
        })
        .then((response) => {
          setEvents(response.data.data.event);
          getTopTags(res);
          setRefreshing(false);
        })
        .catch((error) => {
          console.log({ error });
        });
    });
  }

  useEffect(() => {
    setDatas();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {load == true && (
          <>
            <Header user={user}></Header>
            <Text style={styles.title}>Quoi de neuf dans ta ville ?</Text>
            {events.length == 0 ? (
              <Error
                error={
                  "Ohhh non.. Il n'y a pas d'événements prévu pour ta ville..."
                }
              />
            ) : (
              <Carousel
                DATA={events}
                navigation={navigation}
                user={user}
              ></Carousel>
            )}
            <Text style={styles.title}>Découvrir</Text>
            <CarouselTags
              DATA={tags}
              navigation={navigation}
              user={user}
            ></CarouselTags>

            <Text style={styles.title}>Mes prochains évènements</Text>
            <Agenda
              events={eventsBook}
              navigation={navigation}
              user={user}
            ></Agenda>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },

  image: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    elevation: 13,
    height: 130,
    marginBottom: 50,
    marginLeft: width / 7,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    width: width / 1.5,
  },
  insideImg: {
    color: "#DDDDDD",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 28,
    marginTop: 50,
    textShadowColor: "black",
    textShadowRadius: 4,
  },
  title: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
  },
});
