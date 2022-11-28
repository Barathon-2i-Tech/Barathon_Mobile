import {StyleSheet, View, TextInput, Pressable, Text, Dimensions} from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/colors";
import {storeDataObject} from "../../constants/localStorage";
import Axios from "../../constants/axios";

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const addLogin = async () => {
        if(email == '' || password == ''){
            alert("Veuillez remplire tout les champs !");
        }else{
            Axios.api.post("/login", {
                email : email,
                password : password
            }, {
                headers : {
                    'Accept' : 'application/vnd.api+json',
                    'Content-Type' : 'application/vnd.api+json'
                }
            }).then((response) => {
                console.log("la response : ", response.data.data)
                
                if(response.data.data["user"]["barathonien_id"] != null){
                    storeDataObject("user", response.data.data);
                    navigation.navigate("Home");
                }else{
                    alert("Vous pouvez vous connecter sur l'application mobile qu'avec un compte barathonien !");
                }
            }).catch((e) => {
                console.log(e)
            })
        }
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
