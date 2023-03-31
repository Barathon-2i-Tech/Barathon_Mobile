import {StyleSheet, View} from "react-native";
import MapView from 'react-native-maps';

export default function Example() {
    return (
        <View style={styles.container}>
            <MapView style={styles.map}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        height: '100%',
        width: '100%',
    },
});