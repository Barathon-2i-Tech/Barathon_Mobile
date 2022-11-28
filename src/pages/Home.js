import {StyleSheet, Text, View} from "react-native";
import Colors from "../constants/colors"
import { getDataObject } from "../constants/localStorage"
import React, {useEffect, useState} from "react";

export default function Home() {
    const [user, setUser] = useState({});
    const [load, setLoad] = useState(false);
    async function updateScore(){
        getDataObject('user').then((res) => {
            setUser(res);
            console.log("test : ", res.user.first_name)
            setLoad(true);

        })
    }

    useEffect(() => {
       updateScore();
    }, [])

    return (
        <View>
            {
                load == true &&
                <>
                    <Text style={styles.text}>Bonjour, {user.user.first_name}</Text>
                </>
            }
            
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: Colors.accent,
        alignItems: 'center',
    },
});
