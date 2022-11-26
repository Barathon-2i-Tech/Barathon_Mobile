import {StyleSheet, Text, View, Image, Pressable, Dimensions} from "react-native";
import React, { useState } from "react";
import Colors from "../constants/colors"
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Regiser";

export default function Authenticator() {

    const [choiceForm, setChoiceForm] = useState(false);

    const handleForm = () => {
        if(!choiceForm){
            setChoiceForm(true);
        }else{
            setChoiceForm(false);
        }
    }

    return (
        <View>
            <View style={styles.LogoContainer}>
                <Image style={styles.stretch} source={require('../../assets/image/svg.jpg')} />
            </View>
            
            <View style={styles.Container}>
                <View style={styles.Choice1}>
                    <Pressable onPress={handleForm} style={choiceForm ? styles.UnSelec : styles.Selec}>
                        <Text style={choiceForm ? styles.UnSelecText : styles.SelecText}>Connexion</Text>
                    </Pressable>
                </View>
                <View style={styles.Choice2}>
                    <Pressable onPress={handleForm} style={!choiceForm ? styles.UnSelec : styles.Selec}>
                        <Text style={!choiceForm ? styles.UnSelecText : styles.SelecText}>Inscription</Text>
                    </Pressable>
                </View>
            </View>

            { !choiceForm ? <Login /> : <Register />}
            
        </View>
    );
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height; //full height

const styles = StyleSheet.create({
    text: {
        color: Colors.accent,
        alignItems: 'center',
    },
    Container : {
        flex: 0.5,
        flexDirection: 'row',
    },
    Choice1 : {
        marginTop: 50,
        height: height / 23,
        width: width /2.2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DFDDDD',
        borderTopLeftRadius : 5,
        borderBottomLeftRadius: 5
    },
    Choice2 : {
        marginTop: 50,
        height: height / 23,
        width: width /2.2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DFDDDD',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    Selec : {
        backgroundColor: 'white',
        height : '90%',
        width: '97%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        

    },
    SelecText : {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    UnSelec : {
        backgroundColor: '#DFDDDD',
        height : '90%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    UnSelecText : {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    LogoContainer : {
        justifyContent: 'center',
        alignItems: 'center',
    },
    stretch: {
        width: 150,
        height: 150,
        resizeMode: 'stretch',

    },
    footerText : {
        marginTop : 20,
        fontSize  :15,
    }
});
