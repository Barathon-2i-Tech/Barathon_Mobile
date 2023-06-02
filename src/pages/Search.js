// eslint-disable-next-line no-unused-vars
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Switch, Text} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { getDataObject } from "../constants/localStorage";
import Axios from "../constants/axios";
// @ts-ignore
import bar from '../../assets/image/bar.png';
import chopB from '../../assets/image/chopB.png';



export default function Search({navigation}) {
    const [location, setLocation] = useState(null);
    const [user, setUser] = useState({});
    const [establishment, setEstablishment] = useState({});
    const [event, setEvent] = useState({});
    const [load, setLoad] = useState(false);
    const [choice, setChoice] = useState(false);

    async function setDatas() {
        getDataObject("user").then((res) => {
          setUser(res);
          Axios.api
            .get("/barathonien/events", {
              headers: {
                Authorization: "Bearer " + res.token,
              },
            })
            .then((response) => {
                setEstablishment(response.data.data.establishments);
                setEvent(response.data.data.events);
              setLoad(true);
            })
            .catch((error) => {
              console.log({ error });
            });
        });
      }


    useEffect(() => {
        setDatas();
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location)
            setLocation(location);
        })();
    }, []);

    const handlePress = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log(location)
        setLocation(location);
    }

    const goToEstablishment = (establishment) => {
        navigation.navigate("Establishment", {
          establishment: establishment,
          user: user,
          navigation: navigation,
        });
      };

      const goToEvent = (event_id) => {
        navigation.navigate("Event", {
          event_id: event_id,
          user: user,
          navigation: navigation,
        });
      };

    return (
        <View style={styles.container}>
        {load == true && (
          <>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: location ? location.coords.latitude : 45.7265122,
                    longitude: location ? location.coords.longitude : 4.8352204,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {location && <Marker coordinate={location.coords} title="YOU"/>}
                {choice == false && (
                  <>  
                    
                      {establishment.map((marker, index) => (
                          <Marker
                            key={index}
                            coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                            title={marker.trade_name}
                            description="Voir les évènements..."
                            image={bar}
                          >
                            <Callout
                                onPress={() => {
                                    goToEstablishment(marker);
                                }}
                            >
                            </Callout>
                          </Marker>
                      ))}
                  </>
                )}
                {choice == true && (
                  <>  
                    {event.map((marker, index) => (
                        <Marker
                          key={index}
                          coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                          title={marker.event_name}
                          description="Voir le détail de l'évènement..."
                          image={chopB}
                        >
                          <Callout
                              onPress={() => {
                                goToEvent(marker.event_id);
                              }}
                          >
                          </Callout>
                        </Marker>
                    ))}
                  </>
                )}
            </MapView>
            <View>
              <View style={styles.containerSwitch}>
                <Text style={styles.switchText}>Bar</Text>
                <Switch
                  trackColor={{false: '#155E75', true: '#155E75'}}
                  thumbColor={choice ? '#FDBA74' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(value) => setChoice(value)}
                  value={choice}
                />
                <Text style={styles.switchText}>Événements les 7 prochains jours</Text>
              </View>
              <Button title="Refresh Location" onPress={handlePress} />
            </View>
            
          </>
        )}


        </View>
    );
}

const white = '#fff'
const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        backgroundColor: white,
        flex: 1,
        justifyContent: 'center',
    },

    containerSwitch: {
      flexDirection : 'row',
      justifyContent: "space-between",
    },

    map: {
        height: '90%',
        width: '100%',
    },

    switchText: {
      marginTop : 13,
    }
});