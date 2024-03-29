/* eslint-disable react/prop-types */
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Carousel({ DATA, navigation, user }) {
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const boxWidth = scrollViewWidth * 0.8;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;
  const pan = React.useRef(new Animated.ValueXY()).current;
  const grayColor = "#FFFFFF4B";

  const handleSubmit = (category) => {
    navigation.navigate("EventsByCategory", {
      category: category,
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
          handleSubmit(item);
        }}
      >
        <View
        // eslint-disable-next-line react-native/no-inline-styles
          style={{
            height: "100%",
            width: boxWidth / 1.7,
            borderRadius: 60,
            overflow: "hidden",
            backgroundColor: grayColor,
          }}
        >
          <View style={styles.infoContainer}>
            <View style={styles.iconContainer}>
              <View style={styles.icon}>
                {/*<Ionicons name={JSON.parse(item.category_details).icon} size={25} color="#000000" iconStyle={{marginLeft : 20}} />*/}
                <Ionicons
                  name="beer"
                  size={25}
                  color="#000000"
                  iconStyle={styles.iconMarg}
                />
              </View>
            </View>

            <Text style={styles.title}>
              {JSON.parse(item.category_details).label}
            </Text>
          </View>
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

const black = "black";
const gray = "#FFFFFFB0";
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },

  flatHeight  :{
    height: 90,
  },

  flatPadding :{
    paddingVertical: 16
  },
  icon: {
    marginLeft: 7,
    marginTop: 5,
  },

  iconContainer: {
    backgroundColor: gray,
    borderRadius: 200,
    height: 40,
    marginTop: "5%",
    width: 40,
  },

  iconMarg : {
    marginTop: 10,
  },

  infoContainer: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 10,
  },
  title: {
    color: black,
    marginLeft: 10,
    marginTop: "10%",
  },
});
