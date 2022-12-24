import { StyleSheet, Text, ScrollView } from "react-native";
import { getDataObject } from "../constants/localStorage";
import React, { useEffect, useState } from "react";
import Header from "../components/Home/Header";
import Carousel from "../components/Home/Carousel";
import CarouselTags from "../components/Home/CarouselTags";
import Error from "../components/Error";
import Axios from "../constants/axios";

export default function Home() {
  const [user, setUser] = useState({});
  const [events, setEvents] = useState({});
  const [tags, setTags] = useState({});
  const [load, setLoad] = useState(false);

  async function getTopTags(user){
    Axios.api
    .get("/barathonien/top/categories", {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    })
    .then((response) => {
      console.log("les tags mon frerot : ", response.data.data.categories)
      setTags(response.data.data.categories);
      setLoad(true);
    })
    .catch((error) => {
      console.log(error);
    });
  }


  async function setDatas() {
    getDataObject("user").then((res) => {
      console.log("woulal le res : " + res.user.user_id);
      setUser(res);
      Axios.api
        .get("/barathonien/" + res.user.user_id + "/city/event", {
          headers: {
            Authorization: "Bearer " + res.token,
          },
        })
        .then((response) => {
          setEvents(response.data.data.event);
          getTopTags(res);
          
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  useEffect(() => {
    setDatas();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {load == true && (
        <>
          <Header user={user}></Header>
          <Text style={styles.title}>Quoi de neuf dans ta ville ?</Text>
          {
            events.length == 0 ?
            (<Error error={"Ohhh non.. Il n'y a pas d'événements prévu pour ta ville..."} />) : 
            (<Carousel DATA={events}></Carousel>)
          }
          <Text style={styles.title}>Découvrir</Text>
          <CarouselTags DATA={tags}></CarouselTags>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft : 10,
  },

  title: {
    marginTop : 30,
    color: 'black',
    fontWeight: "bold",
    fontSize : 20,
  },
});
