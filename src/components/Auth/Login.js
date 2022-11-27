import {StyleSheet, View, TextInput, Pressable, Text, Dimensions} from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/colors";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const addLogin = () => {
        console.log("Email : " + email + " password : " + password);
    }

    return (
        <View style={styles.mainContainer}>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                keyboardType="default"
            />

            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Mot de passe"
                keyboardType="default"
            />

            <Pressable onPress={addLogin} style={styles.button}>
                <Text style={styles.buttonText}>Se connecter</Text>
            </Pressable>

            <View style={styles.footer}>
                <Pressable >
                    <Text style={styles.footerText}>Mot de passe oublier ?</Text>
                </Pressable>
            </View>
        </View>
    );
}

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({

    mainContainer: {
        width : width / 1.1,
        marginLeft : width / 25,
    },
    input : {
        backgroundColor : '#F0F0F0',
        height : 50,
        borderRadius : 5,
        marginBottom: 30,
    },

    button : {
        backgroundColor : Colors.primary,
        height : 50,
        borderRadius: 5,
        marginTop: 20,
    },

    buttonText : {
        color : 'white',
        textAlign: 'center',
        fontSize : 18,
        paddingTop : 8,
    },
});
