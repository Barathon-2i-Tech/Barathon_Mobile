/* eslint-disable react/prop-types */
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import moment from "moment-timezone";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Carousel({ DATA, navigation, user }) {
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const boxWidth = scrollViewWidth * 0.8;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;
  const pan = React.useRef(new Animated.ValueXY()).current;

  const handleSubmit = (event_id) => {
    navigation.navigate("Event", {
      event_id: event_id,
      user: user,
      navigation: navigation,
    });
  };

  const renderItem = ({ item, index }) => (
    <Animated.View
      style={{
        transform: [
          {
            scale: pan.x.interpolate({
              inputRange: [
                (index - 1) * boxWidth - halfBoxDistance,
                index * boxWidth - halfBoxDistance,
                (index + 1) * boxWidth - halfBoxDistance, // adjust positioning
              ],
              outputRange: [0.95, 1, 0.95], // scale down when out of scope
              extrapolate: "clamp",
            }),
          },
        ],
      }}
    >
      <Pressable
        onPress={() => {
          handleSubmit(item.event_id);
        }}
      >
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            height: "100%",
            width: boxWidth,
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <ImageBackground
            source={{ uri: item.poster }}
            resizeMode="cover"
            style={styles.image}
          >
            <Text style={styles.date}>
              {moment(item.start_event)
                .tz("Europe/Paris")
                .format("dddd MMM YY, HH") + "H"}
            </Text>
            <Text style={styles.title}>{item.event_name}</Text>
            <View style={styles.infoContainer}>
              <Ionicons
                name="pricetag"
                size={15}
                color="#DDDDDD"
                iconStyle={styles.icon}
              />
              <Text style={styles.info}>{item.price} €</Text>
            </View>
          </ImageBackground>
        </View>
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={DATA}
        style={styles.flatHeight}
        contentContainerStyle={styles.flatPadding}
        contentInsetAdjustmentBehavior="never"
        snapToAlignment="center"
        decelerationRate="fast"
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        snapToInterval={boxWidth}
        contentInset={{
          left: halfBoxDistance,
          right: halfBoxDistance,
        }}
        contentOffset={{ x: halfBoxDistance * -1, y: 0 }}
        onLayout={(e) => {
          setScrollViewWidth(e.nativeEvent.layout.width);
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: pan.x } } }],
          {
            useNativeDriver: false,
          }
        )}
        keyExtractor={(item, index) => `${index}-${item}`}
        renderItem={renderItem}
      />
    </View>
  );
}

const white = "white";
const black = "black";
const bkColor = "rgba(52, 52, 52, 0.7)";
const bkColor2 = "rgba(52, 52, 52, 0.5)";
const colorContainer = "#DDDDDD";

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  date: {
    backgroundColor: bkColor,
    color: white,
    marginTop: "55%",
    paddingLeft: 10,
    paddingTop: 10,
    textShadowColor: black,
    textShadowRadius: 4,
  },

  flatHeight  :{
    height: 300,
  },

  flatPadding :{
    paddingVertical: 16
  },

  icon : {
    marginTop: 10,
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },

  info: {
    color: white,
    fontSize: 15,
    paddingLeft: 10,
    textShadowColor: black,
    textShadowRadius: 4,
  },

  infoContainer: {
    backgroundColor: bkColor2,
    color: colorContainer,
    flex: 1,
    flexDirection: "row",
    paddingLeft: 10,
    textShadowColor: black,
    textShadowRadius: 4,
  },
  title: {
    backgroundColor: bkColor,
    color: white,
    fontSize: 20,
    paddingLeft: 10,
    textShadowColor: black,
    textShadowRadius: 4,
  },
});
