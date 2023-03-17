import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Pressable
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from 'moment-timezone';
moment.locale();

export default function Agendas({ navigation, events, user }) {

  const handleSubmit = (event_id) => {
    navigation.navigate("Event", { event_id: event_id, user: user, navigation : navigation });
  };

  return (
    <View style={styles.container}>
      {
        Object.keys(events).map((key) => {
          return (
            <View key={key}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>{key}</Text>
                <View >
                  <Ionicons name="calendar" size={30} color="red" />
                </View>
              </View>
              {
                events[key].map((eventBook) => {
                  return (
                    <Pressable key={eventBook.event_id} onPress={() => { handleSubmit(eventBook.event.event_id) }}>
                      <View style={styles.containerEvent}>
                        <ImageBackground source={{ uri: eventBook.event.poster }} resizeMode="cover" style={styles.image}>
                          <Text style={styles.date}>{moment(eventBook.event.start_event).tz('Europe/Paris').format('dddd MMM YY, HH') + 'H'}</Text>
                          <Text style={styles.title}>{eventBook.event.event_name}</Text>
                          <View style={styles.infoContainer}>
                            <Ionicons name="pricetag" size={15} color="#DDDDDD" iconStyle={{ marginTop: 10 }} />
                            <Text style={styles.info}>{eventBook.event.price} €</Text>
                          </View>
                        </ImageBackground>
                      </View>
                    </Pressable>
                  )
                })
              }
            </View>
          )
        })
      }
    </View>
  );
}

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({

  container: {
    width: width / 1.1,
    marginLeft: "2%",
    marginTop: "3%",
  },

  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    marginBottom: 40,
  },

  headerTitle: {
    fontSize: 20,
  },

  date: {
    paddingTop: 10,
    paddingLeft: 10,
    marginTop: '37%',
    color: 'white',
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
    textShadowColor: 'black',
    textShadowRadius: 4,
  },
  title: {
    color: 'white',
    paddingLeft: 10,
    fontSize: 20,
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
    textShadowColor: 'black',
    textShadowRadius: 4,
  },
  info: {
    color: 'white',
    paddingLeft: 10,
    fontSize: 15,
    textShadowColor: 'black',
    textShadowRadius: 4,
  },

  image: {
    height: 220,
    flex: 1,
    justifyContent: "center",
    marginBottom: 40,
    borderRadius: 20,
    overflow: 'hidden',


  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 10,
    color: '#DDDDDD',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    textShadowColor: 'black',
    textShadowRadius: 4,
  },
});
