// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';



export default function Search() {
    const [location, setLocation] = useState(null);

    useEffect(() => {
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
    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                     initialRegion={{
                         latitude: location ? location.coords.latitude : 45.7265122,
                         longitude: location ? location.coords.longitude : 4.8352204,
                         latitudeDelta: 0.0922,
                         longitudeDelta: 0.0421,
                     }}
            >
                {location && <Marker coordinate={location.coords} />}
            </MapView>
            <Button title="Get Location" onPress={handlePress} />
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