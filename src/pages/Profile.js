/* eslint-disable react/prop-types */
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Platform,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import Colors from "../constants/colors";
import Axios from "../constants/axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

export default function Profile({ route }) {
  const [date, setDate] = useState(new Date());
  const [selectDate, setSelectDate] = useState(false);
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);
  const [barathonien, setBarathonien] = useState("");

  const { user, navigation } = route.params;

  async function getUserProfile() {
    Axios.api
      .get("/barathonien/" + user.userLogged.user_id, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        setBarathonien(response.data.data[0]);
        setLoad(true);
      })
      .catch((error) => {
        console.log(error);
        alert("Erreur : Veuillez réessayer");
      });
  }

  useEffect(() => {
    getUserProfile();
  }, []);

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

  const showDatepicker = () => {
    if (show == false) {
      setShow(true);
    } else {
      showMode();
    }
  };

  const updateProfile = async (values) => {
    const age = moment().diff(date, "years");
    if (
      date.toString().substring(0, 10) == new Date().toString().substring(0, 10)
    ) {
      alert("Saisie ta date de naissance !");
    } else if (age < 18) {
      alert("Tu ne peux pas accéder à l'application en tant que mineur !");
    } else {
      Axios.api
        .put(
          "/barathonien/" + user.userLogged.user_id,
          {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            address: values.address,
            postal_code: values.postal_code,
            city: values.city,
            birthday: date,
          },
          {
            headers: {
              Accept: "application/vnd.api+json",
              "Content-Type": "application/vnd.api+json",
              Authorization: "Bearer " + user.token,
            },
          }
        )
        .then(() => {
          if (values.email != barathonien.email) {
            Axios.api
              .post(
                "/logout",
                {},
                {
                  headers: {
                    Accept: "application/vnd.api+json",
                    "Content-Type": "application/vnd.api+json",
                    Authorization: "Bearer " + user.token,
                  },
                }
              )
              .then(() => {
                navigation.navigate("Auth");
              })
              .catch((error) => {
                console.log(error);
                alert("Erreur : regergergerg");
              });
          } else {
            navigation.navigate("HomeStack");
          }
        })
        .catch((e) => {
          console.log(e);
          alert("Erreur : Veuillez réessayer");
        });
    }
  };

  const ProfileSchema = Yup.object().shape({
    first_name: Yup.string().required("Entrez votre prénom"),
    last_name: Yup.string().required("Entrez votre nom"),
    email: Yup.string()
      .email("Entrez une adresse e-mail valide")
      .required("Entrez une adresse e-mail"),
    address: Yup.string().required("Entrez votre adresse"),
    postal_code: Yup.string().required("Entrez un code postal"),
    city: Yup.string().required("Entrez votre ville"),
  });

  return (
    <ScrollView style={styles.mainContainer}>
      {load == true && (
        <>
          <View style={styles.logoContainer}>
            <Image
              style={styles.stretch}
              source={require("../../assets/image/barathonien.png")}
            />
            <Text style={styles.test}>PROFILE</Text>
          </View>

          <Formik
            initialValues={{
              first_name: barathonien.first_name,
              last_name: barathonien.last_name,
              email: barathonien.email,
              address: barathonien.address,
              postal_code: barathonien.postal_code,
              city: barathonien.city,
            }}
            validationSchema={ProfileSchema}
            onSubmit={(values) => updateProfile(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View style={styles.container}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("first_name")}
                  onBlur={handleBlur("first_name")}
                  value={values.first_name}
                  placeholder="Prénom"
                  keyboardType="default"
                />
                {errors.first_name && (
                  <Text style={styles.error}>{errors.first_name}</Text>
                )}
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("last_name")}
                  onBlur={handleBlur("last_name")}
                  value={values.last_name}
                  placeholder="Nom"
                  keyboardType="default"
                />
                {errors.last_name && (
                  <Text style={styles.error}>{errors.last_name}</Text>
                )}

                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder="Email"
                  keyboardType="email-address"
                />
                {errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}

                <Pressable style={styles.btnDate} onPress={showDatepicker}>
                  {!selectDate ? (
                    <Text style={styles.buttonText}>
                      saisir ta date de naissance
                    </Text>
                  ) : (
                    <Text style={styles.buttonText}>
                      {moment(date).format("DD/MM/YYYY")}
                    </Text>
                  )}
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

                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  value={values.address}
                  placeholder="Adresse"
                  keyboardType="default"
                />
                {errors.address && (
                  <Text style={styles.error}>{errors.address}</Text>
                )}
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("city")}
                  onBlur={handleBlur("city")}
                  value={values.city}
                  placeholder="Ville"
                  keyboardType="default"
                />
                {errors.city && <Text style={styles.error}>{errors.city}</Text>}
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("postal_code")}
                  onBlur={handleBlur("postal_code")}
                  value={values.postal_code}
                  placeholder="Code postal"
                  keyboardType="default"
                />
                {errors.postal_code && (
                  <Text style={styles.error}>{errors.postal_code}</Text>
                )}

                <Pressable onPress={handleSubmit} style={styles.btnSubmit}>
                  <Text style={styles.buttonText}>Mettre à jour le profil</Text>
                </Pressable>
              </View>
            )}
          </Formik>
        </>
      )}
    </ScrollView>
  );
}

const width = Dimensions.get("window").width;
const errorColor = "red";
const testColor = "black";
const buttonColorText = "white";
const backgroundColorInput = "#F0F0F0";
const bkColorMainContainer = "#fff";
const styles = StyleSheet.create({
  btnDate: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 5,
    height: 50,
    marginLeft: 50,
    marginTop: 20,
    width: width / 1.5,
  },
  btnSubmit: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    marginLeft: 50,
    marginTop: 20,
    width: width / 1.5,
  },

  buttonText: {
    color: buttonColorText,
    fontSize: 18,
    paddingTop: 10,
    textAlign: "center",
  },
  container: {
    marginLeft: width / 25,
    width: width / 1.1,
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
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 130,
  },
  mainContainer: {
    backgroundColor: bkColorMainContainer,
    flex: 1,
  },

  stretch: {
    height: 160,
    resizeMode: "stretch",
    width: 170,
  },
  test: {
    color: testColor,
    fontSize: 50,
  },
});
