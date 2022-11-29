/* eslint-disable react/prop-types */
import {StyleSheet, Text, View, Pressable, Platform, Dimensions, TextInput} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from "react";
import Colors from "../../constants/colors";
import Axios from "../../constants/axios";
import {storeDataObject} from "../../constants/localStorage";

export default function Register({ navigation }) {

    const [date, setDate] = useState(new Date());
    const [selectDate, setSelectDate] = useState(false);
    const [show, setShow] = useState(false);
    const [step, setStep] = useState(1);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [adresse, setAdresse] = useState('');
    const [cp, setCp] = useState('');
    const [ville, setVille] = useState('');




    const onChange = (event) => {

        setShow(false);
        
        if(event["nativeEvent"]["timestamp"] != undefined){
            setSelectDate(true);
            setDate(new Date(event["nativeEvent"]["timestamp"]));
            
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

        let age = Date.now() - date.getTime();
        let age_dt = new Date(age);
        let year = age_dt.getUTCFullYear();
        age = Math.abs(year - 1970);

        if(date.toString().substring(0, 10) == new Date().toString().substring(0, 10)){
            alert("Veuillez saisir votre date de naissance !");
        }else if(age < 18){
            alert("Vous ne pouvez pas accéder à l'application en tant que mineur !")
        }else{
            setStep(step + 1);
        }
        
    }

    const addLogin = () => {
        let reg = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w\w+)+$/;
        if(email == '' || password == '' || confirmPassword == ''){
            alert("Veuillez saisir tous les champs du formulaire !")
        }else if (reg.test(email) === false) {
            alert("Veuillez saisir une adresse email valide !")
        }else if(password.length < 8){
            alert("Veuillez saisir un mot de passe supérieur à 8 caractères !")
        }else if(password != confirmPassword){
            alert("Veuillez saisir les deux mêmes mots de passe !")
        }else{
            setStep(step + 1);
        }
    }

    const personnalInfo = () => {
        if(lastName == '' || firstName == '' || adresse == '' || cp == '' || ville == ''){
            alert("Veuillez saisir tous les champs du formulaire !")
        }else if(cp.length < 5){
            alert("Veuillez sasir un code postal valide");
        }else{
            Axios.api.post("/register/barathonien", {
                email : email,
                password : password,
                password_confirmation : confirmPassword,
                first_name : firstName,
                last_name : lastName,
                birthday : date,
                adress : adresse,
                postal_code : cp,
                city : ville,
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
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Email"
                        keyboardType="email-adress"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Mot de passe"
                        keyboardType="default"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        placeholder="Confirmer votre Mot de passe"
                        keyboardType="default"
                    />
                    <Pressable onPress={addLogin} style={styles.valider}>
                        <Text style={styles.buttonText}>Etape suivante</Text>
                    </Pressable>
                </>
            }

            {
                step == 3 &&

                <>
                    <Text style={styles.title2}>Dernière étape !</Text>
                    <Text style={styles.title}>Parle nous un peu de toi</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputFlex}
                            onChangeText={setLastName}
                            value={lastName}
                            placeholder="Nom"
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.inputFlex}
                            onChangeText={setFirstName}
                            value={firstName}
                            placeholder="Prenom"
                            keyboardType="default"
                        />
                    </View>

                    <TextInput
                        style={styles.input}
                        onChangeText={setAdresse}
                        value={adresse}
                        placeholder="N° et nom de ta rue"
                        keyboardType="default"
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={setCp}
                        value={cp}
                        placeholder="Code Postal"
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={setVille}
                        value={ville}
                        placeholder="Ville"
                        keyboardType="default"
                    />

                    <Pressable onPress={personnalInfo} style={styles.valider}>
                        <Text style={styles.buttonText}>C&apos;est parti !</Text>
                    </Pressable>
                </>
            }


        </View>
    );
}

const width = Dimensions.get("window").width;
//const height = Dimensions.get("window").height; //full height

const styles = StyleSheet.create({

    mainContainer: {
        width : width / 1.1,
        marginLeft : width / 25,
    },
    
    inputContainer : {
        flex : 1,
        flexDirection: 'row',
        justifyContent : "space-between",
    },

    inputFlex : {
        backgroundColor : '#F0F0F0',
        height : 50,
        width : width / 2.5,
        borderRadius : 5,
        marginBottom: 30,
    },

    input : {
        backgroundColor : '#F0F0F0',
        height : 50,
        borderRadius : 5,
        marginBottom: 30,
    },

    title : {
        fontWeight : "bold",
        fontSize : 20,
        textAlign : 'center',
        marginBottom : 40,
    },

    title2 : {
        fontWeight : "bold",
        fontSize : 20,
        textAlign : 'center',
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
        marginBottom : 20,
    },
});