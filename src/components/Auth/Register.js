/* eslint-disable react/prop-types */
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  Dimensions,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import Colors from "../../constants/colors";
import Axios from "../../constants/axios";
import { storeDataObject } from "../../constants/localStorage";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";

export default function Register({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [selectDate, setSelectDate] = useState(false);
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //this method is executed when a date is chosen
  const onChange = (event) => {
    setShow(false);

    if (event["nativeEvent"]["timestamp"] != undefined) {
      setSelectDate(true);
      setDate(new Date(event["nativeEvent"]["timestamp"]));
    }
  };

  const showMode = () => {
    if (Platform.OS === "android") {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
  };

  //Open or Close the dataPicker
  const showDatepicker = () => {
    if (show == false) {
      setShow(true);
    } else {
      showMode();
    }
  };

  //when the birth's date is chosen, check if the user is an adult
  const checkBirth = () => {
    const age = moment().diff(date, "years");

    if (
      date.toString().substring(0, 10) == new Date().toString().substring(0, 10)
    ) {
      alert("Saisie ta date de naissance !");
    } else if (age < 18) {
      alert("Tu ne peux pas accéder à l'application en tant que mineur !");
    } else {
      setStep(step + 1);
    }
  };

  // Save login information after validation
  const login = (values) => {
    setEmail(values.email);
    setPassword(values.password);
    setConfirmPassword(values.confirmPassword);
    setStep(step + 1);
  };

  // get personnal info after validation and create the barathonien with the api method /register/barathonien redirect to home after the registration
  const personnalInfo = (values) => {
    Axios.api
      .post(
        "/register/barathonien",
        {
          email: email.toLowerCase(),
          password: password,
          password_confirmation: confirmPassword,
          first_name: values.first_name,
          last_name: values.last_name,
          birthday: date,
          adress: values.adress,
          postal_code: values.postal_code,
          city: values.city,
        },
        {
          headers: {
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
          },
        }
      )
      .then((response) => {
        storeDataObject("user", response.data.data);
        navigation.navigate("HomeStack");
      })
      .catch((e) => {
        console.log(e.toJSON());
      });
  };

  //Schemas for check the validity of the data entered
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .required("Saisie ton email")
      .email("Saisie une adresse email"),
    password: Yup.string()
      .min(8, "Mot de passe trop court! >8")
      .required("Saisie ton mot de passe"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "les mots de passe doivent être identiques"
    ),
  });

  const SignupSchema2 = Yup.object().shape({
    last_name: Yup.string().required("Saisie ton nom"),
    first_name: Yup.string().required("Saisie ton prénom"),
    adress: Yup.string().required("Saisie ton adresse"),
    postal_code: Yup.string()
      .min(5, "Code postal trop court!")
      .max(5, "Code postal trop long!")
      .required("Saisie ton code postal"),
    city: Yup.string().required("Saisie ton adresse"),
  });

  return (
    <View style={styles.mainContainer}>
      {step == 1 && (
        <>
          <Text style={styles.title}>
            Avant de commencer, nous devons verifier que tu as plus de 18 ans
          </Text>
          <Pressable style={styles.btnDate} onPress={showDatepicker}>
            {!selectDate ? (
              <Text style={styles.buttonText}>saisir ta date de naissance</Text>
            ) : (
              <Text style={styles.buttonText}>
                {moment(date).format("DD/MM/YYYY")}
              </Text>
            )}
          </Pressable>
          <Pressable style={styles.valider} onPress={checkBirth}>
            <Text style={styles.buttonText}>Verifier</Text>
          </Pressable>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"date"}
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </>
      )}

      {step == 2 && (
        <>
          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            validationSchema={SignupSchema}
            onSubmit={(values) => login(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <>
                <Text style={styles.title}>
                  Nous avons besoin que tu renseigne tes futurs identifiants de
                  connexion
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder="Email"
                  keyboardType="email-adress"
                />
                {errors.email && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.email}
                  </Text>
                )}
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholder="Mot de passe"
                  keyboardType="default"
                  secureTextEntry={true}
                />
                {errors.password && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.password}
                  </Text>
                )}
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  placeholder="Confirmer votre Mot de passe"
                  keyboardType="default"
                  secureTextEntry={true}
                />
                {errors.confirmPassword && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.confirmPassword}
                  </Text>
                )}
                <Pressable onPress={handleSubmit} style={styles.valider}>
                  <Text style={styles.buttonText}>Etape suivante</Text>
                </Pressable>
              </>
            )}
          </Formik>
        </>
      )}

      {step == 3 && (
        <>
          <Formik
            initialValues={{
              last_name: "",
              first_name: "",
              adress: "",
              code_postal: "",
              city: "",
            }}
            validationSchema={SignupSchema2}
            onSubmit={(values) => personnalInfo(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <>
                <Text style={styles.title2}>Dernière étape !</Text>
                <Text style={styles.title}>Parle nous un peu de toi</Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputFlex}
                    onChangeText={handleChange("last_name")}
                    onBlur={handleBlur("last_name")}
                    value={values.last_name}
                    placeholder="Nom"
                    keyboardType="default"
                  />

                  <TextInput
                    style={styles.inputFlex}
                    onChangeText={handleChange("first_name")}
                    onBlur={handleBlur("first_name")}
                    value={values.first_name}
                    placeholder="Prenom"
                    keyboardType="default"
                  />
                </View>
                <View style={styles.inputContainer}>
                  {errors.last_name && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {errors.last_name}
                    </Text>
                  )}
                  {errors.first_name && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {errors.first_name}
                    </Text>
                  )}
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("adress")}
                  onBlur={handleBlur("adress")}
                  value={values.adress}
                  placeholder="N° et nom de ta rue"
                  keyboardType="default"
                />
                {errors.adress && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.adress}
                  </Text>
                )}
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("postal_code")}
                  onBlur={handleBlur("postal_code")}
                  value={values.postal_code}
                  placeholder="Code Postal"
                  keyboardType="numeric"
                />
                {errors.postal_code && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.postal_code}
                  </Text>
                )}
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("city")}
                  onBlur={handleBlur("city")}
                  value={values.city}
                  placeholder="Ville"
                  keyboardType="default"
                />
                {errors.city && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.city}
                  </Text>
                )}
                <Pressable onPress={handleSubmit} style={styles.valider}>
                  <Text style={styles.buttonText}>C&apos;est parti !</Text>
                </Pressable>
              </>
            )}
          </Formik>
        </>
      )}
    </View>
  );
}

const width = Dimensions.get("window").width;
//const height = Dimensions.get("window").height; //full height

const styles = StyleSheet.create({
  btnDate: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 5,
    height: 40,
    marginLeft: 50,
    width: width / 1.5,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    paddingTop: 6,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
    height: 50,
    marginTop: 30,
    paddingLeft: 15,
  },

  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  inputFlex: {
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
    height: 50,
    marginTop: 30,
    paddingLeft: 15,
    width: width / 2.5,
  },

  mainContainer: {
    marginLeft: width / 25,
    width: width / 1.1,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  title2: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  valider: {
    backgroundColor: Colors.accent,
    borderRadius: 10,
    height: 40,
    marginBottom: 20,
    marginLeft: 50,
    marginTop: 30,
    width: width / 1.5,
  },
});
