import { StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView } from "react-native";
import Axios from "../constants/axios";
import React, { useEffect, useState } from "react";
import { getDataObject } from "../constants/localStorage";
import QRCode from 'react-native-qrcode-svg';

export default function Ticket() {

  //const [user, setUser] = useState({});
  const [eventsBook, setEventsBook] = useState({});
  const [load, setLoad] = useState(false);

  async function setDatas() {
    getDataObject("user").then((res) => {
      //setUser(res);
      Axios.api
      .get("/barathonien/" + res.userLogged.user_id + "/booking/events", {
        headers: {
          Authorization: "Bearer " + res.token,
        },
      })
      .then((response) => {
        console.log("ouioui", response.data.data.bookings)
        setEventsBook(response.data.data.bookings);
        setLoad(true);
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
    <SafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Mes Billets</Text>
        </View>

        {load == true && (
          <>
            {
              Object.keys(eventsBook).map((key) => {
                return (
                  <View key={key}>
                    {
                      eventsBook[key].map((event) => {
                        return (
                          <View key={event.event_id} style={styles.containerQr}>
                            
                              <View>
                                <Text>{event.event.event_name}</Text>
                                <Text>{event.event.start_event}</Text>
                              </View>
                            
                            
                              <View>
                                  <QRCode
                                    value="http://awesome.link.qr"
                                  />
                              </View>
                          </View>
                        )
                      })
                    }
                  </View>
                )
              })
            }
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({

  containerQr: {
    flex: 1,
    flexDirection : 'row',
    justifyContent : 'space-between',
    marginTop : 50,
    marginLeft : '8%',
    paddingBottom : 20,
    width : width / 1.2,
    borderBottomWidth : 1,
    alignItems: 'center'
  },

  header: {
    backgroundColor : 'white',
    width : '100%',
    height : height / 9,
    borderBottomWidth : 1,
    borderBottomColor : '#CFCFCF'
  },

  title: {
    color: 'black',
    textAlign: 'center',
    marginTop : '12%',
    fontSize : 20,
    fontWeight : 'bold',
    
  },
});
