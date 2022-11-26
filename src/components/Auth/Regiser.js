import {StyleSheet, Text, View, Pressable, Platform, Dimensions} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from "react";
import Colors from "../../constants/colors";
//import Colors from "../constants/colors"

export default function Register() {

    const [date, setDate] = useState(new Date());
    const [selectDate, setSelectDate] = useState(false);
    const [show, setShow] = useState(false);
    const [step, setStep] = useState(1);


    const onChange = (event) => {

        setShow(false);
        
        if(event["nativeEvent"]["timestamp"] != undefined){
            setSelectDate(true);
            setDate(new Date(event["nativeEvent"]["timestamp"]));
            console.log(date);
        }
    };

    const showMode = () => {
        
        if (Platform.OS === 'android') {
          setShow(false);
          // for iOS, add a button that closes the picker
        }
    };

    const showDatepicker = () => {

        if(show == false){
            setShow(true);
        }else{
            showMode();
        }
        
    };

    const validerNaiss = () => {
        console.log(date)
        setStep(step + 1);
    }

    return (
        <View>
            {
                step == 1 &&
                <>
                    <Text style={styles.title}>Avant de commencer, nous devons verifier que tu as plus de 18 ans</Text>
                    <Pressable style={styles.btnDate} onPress={showDatepicker}>
                        {!selectDate ? <Text style={styles.buttonText}>saisir ta date de naissance</Text> : <Text style={styles.buttonText}>{date.toDateString()}</Text>}
                    </Pressable>
                    <Pressable style={styles.valider} onPress={validerNaiss}>
                        <Text style={styles.buttonText}>Verifier</Text>
                    </Pressable>
                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        onChange={onChange}
                        />
                    )}
                </>
            }

            {
                step == 2 &&

                <>
                    <Text style={styles.title}>Nous avons besoin que tu renseigne tes futurs identifiants de connexion</Text>
                </>
            }


        </View>
    );
}

const width = Dimensions.get("window").width;
//const height = Dimensions.get("window").height; //full height

const styles = StyleSheet.create({

    title : {
        fontWeight : "bold",
        fontSize : 20,
        textAlign : 'center',
        marginBottom : 40,
    },
    btnDate : {
        backgroundColor : Colors.primary,
        height : 40,
        width : width / 1.5,
        alignItems: 'center',
        marginLeft : 50,
    },

    buttonText : {
        color : 'white',
        textAlign: 'center',
        fontSize : 18,
        paddingTop : 6,
    },

    valider : {
        backgroundColor : Colors.accent,
        marginTop : 30,
        width : width / 1.5,
        marginLeft : 50,
        height : 40,
        borderRadius : 10,
    }
});