// eslint-disable-next-line no-unused-vars
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { StyleSheet, View, Button} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { getDataObject } from "../constants/localStorage";
import Axios from "../constants/axios";



export default function Search({navigation}) {
    const [location, setLocation] = useState(null);
    const [user, setUser] = useState({});
    const [establishment, setEstablishment] = useState({});
    const [load, setLoad] = useState(false);

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
                console.log("oui");
                setEstablishment(response.data.data.establishments);
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
                {location && <Marker coordinate={location.coords} />}
                {establishment.map((marker, index) => (
                    <Marker
                    key={index}
                    coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                    title={marker.trade_name}
                    description="Voir les évènemments..."

                    >
                    <Callout
                        onPress={() => {
                            goToEstablishment(marker);
                        }}
                    >
                    </Callout>
                    </Marker>
                ))}
            </MapView>
            <Button title="Get Location" onPress={handlePress} />
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
    map: {
        height: '90%',
        width: '100%',
    },
});