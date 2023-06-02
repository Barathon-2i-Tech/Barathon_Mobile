/* eslint-disable react/prop-types */
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
  Dimensions,
} from "react-native";
import Colors from "../../constants/colors";
import { storeDataObject } from "../../constants/localStorage";
import Axios from "../../constants/axios";
import { Formik } from "formik";
import * as Yup from "yup";

export default function Login({ navigation }) {
  // login fonction : get mail and password of user and check login method api for accept or not the login and redirect to Home when it's ok
  const login = async (values) => {
    Axios.api
      .post(
        "/login",
        {
          email: values.email.toLowerCase(),
          password: values.password,
        },
        {
          headers: {
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
          },
        }
      )
      .then((response) => {
        if (response.data.data["userLogged"]["barathonien_id"] != null) {
          //Use LocalStorage in React Native
          storeDataObject("user", response.data.data);
          navigation.navigate("HomeStack");
        } else {
          alert(
            "Tu peux te connecter sur l'application mobile qu'avec un compte barathonien !"
          );
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Erreur : Veuillez réessayer");
      });
  };

  //Schema for check the validity of the data entered
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .required("Saisie ton email")
      .email("Saisie une adresse email"),
    password: Yup.string()
      .min(8, "Mot de passe trop court! >8")
      .required("Saisie ton mot de passe"),
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
            <Text style={styles.error}>{errors.email}</Text>
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
            <Text style={styles.error}>
              {errors.password}
            </Text>
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
const errorColor = "red";
const buttonColorText = "white";
const backgroundColorInput = '#F0F0F0';
const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    height: 50,
    marginTop: 20,
  },

  buttonText: {
    color: buttonColorText,
    fontSize: 18,
    paddingTop: 10,
    textAlign: "center",
  },

  error: {
    color: errorColor,
    fontSize: 10, 
  },

  input: {
    backgroundColor: backgroundColorInput,
    borderRadius: 5,
    height: 50,
    marginTop: 30,
    paddingLeft: 15,
  },

  mainContainer: {
    marginLeft: width / 25,
    width: width / 1.1,
  },
});
