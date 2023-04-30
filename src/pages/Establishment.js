/* eslint-disable react/prop-types */

import { StyleSheet, Text, View, Image, Dimensions, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Carousel from "../components/Home/Carousel";

export default function Establishment({ route }) {
  const { establishment, user, navigation } = route.params;


  return (
    <View>

        <View style={styles.back}>
            <Pressable
                onPress={() => {
                    navigation.navigate("HomeStack");
                }}
            >
                <Ionicons
                    name="arrow-back"
                    size={30}
                    color="black"
                    iconStyle={styles.margin}
                />
            </Pressable>
        </View>

        <View style={styles.establishmentContainer}>
            <View style={styles.containerImg}>
                <Image
                    style={styles.stretch}
                    source={{ uri: establishment.logo }}
                />
            </View>
            <View>
                <Text style={styles.title}>
                    {establishment.trade_name}
                </Text>
                <Text style={styles.desc}>
                    {establishment.phone} - {establishment.email} - {establishment.website}
                </Text>
            </View>
        </View>

        <View style={styles.opening}>
            <Text style={styles.desc}>
                Lundi : {establishment.opening.Lundi}
            </Text>

            <Text style={styles.desc}>
                Mardi : {establishment.opening.Mardi}
            </Text>

            <Text style={styles.desc}>
                Mercredi : {establishment.opening.Mercredi}
            </Text>

            <Text style={styles.desc}>
                Jeudi : {establishment.opening.Jeudi}
            </Text>

            <Text style={styles.desc}>
                Vendredi : {establishment.opening.Vendredi}
            </Text>

            <Text style={styles.desc}>
                Samedi : {establishment.opening.Samedi}
            </Text>

            <Text style={styles.desc}>
                Dimanche : {establishment.opening.Dimanche}
            </Text>
        </View>

        <Carousel
                DATA={establishment.events}
                navigation={navigation}
                user={user}
        ></Carousel>
        
    </View>
  );
}

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({

    back: {
        marginTop: 50,
      },

    containerImg: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop : '0%',
    },

    desc: {
        textAlign: 'center',
    },

    establishmentContainer: {
        borderBottomWidth : 1,
        borderRadius : 10,
        marginLeft : '4.5%',
        marginTop : "10%",
        width : width / 1.1,
    },

    opening: {
        marginTop : 20,
    },

    stretch: {
        borderRadius: 100,
        height: 130,
        overflow: "hidden",
        resizeMode: "stretch",
        width: 130,
    },

    title: {
        fontSize: 20,
        fontWeight : 'bold',
        marginTop : 30,
        textAlign: 'center',
    }


});
