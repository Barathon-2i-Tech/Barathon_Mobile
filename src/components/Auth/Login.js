/* eslint-disable react/prop-types */
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
  Dimensions,
} from "react-native";
import React from "react";
import Colors from "../../constants/colors";
import { storeDataObject } from "../../constants/localStorage";
import Axios from "../../constants/axios";
import { Formik } from "formik";
import * as Yup from "yup";

export default function Login({ navigation }) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const login = async (values) => {

    Axios.api
      .post(
        "/login",
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Accept": "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
          },
        }
      )
      .then((response) => {
        console.log("la response : ", response.data.data);

        if (response.data.data["user"]["barathonien_id"] != null) {
          storeDataObject("user", response.data.data);
          navigation.navigate("Home");
        } else {
          alert(
            "Vous pouvez vous connecter sur l'application mobile qu'avec un compte barathonien !"
          );
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Erreur : Veuillez réessayer");
      });
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .required("Veuillez saisir votre email")
      .email("Veuillez saisir une adresse email"),
    password: Yup.string().min(8, "Trop court! >8").required("Veuillez saisir votre mot de passe"),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={(values) => login(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.mainContainer}>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            placeholder="Email"
            keyboardType="default"
          />

          {errors.email && (
            <Text style={{ fontSize: 10, color: "red" }}>{errors.email}</Text>
          )}

          <TextInput
            style={styles.input}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            placeholder="Mot de passe"
            keyboardType="default"
          />

          {errors.password && (
            <Text style={{ fontSize: 10, color: "red" }}>{errors.password}</Text>
          )}

          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </Pressable>

          <View style={styles.footer}>
            <Pressable>
              <Text style={styles.footerText}>Mot de passe oublier ?</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
}

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  mainContainer: {
    width: width / 1.1,
    marginLeft: width / 25,
  },
  input: {
    backgroundColor: "#F0F0F0",
    height: 50,
    borderRadius: 5,
    marginTop: 30,
    paddingLeft: 15,
  },

  button: {
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 5,
    marginTop: 20,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    paddingTop: 10,
  },
});
