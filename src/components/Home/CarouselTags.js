/* eslint-disable react/prop-types */
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Animated,
  } from "react-native";
  import React, { useState } from "react";
  import Ionicons from '@expo/vector-icons/Ionicons';
  
  
  
  
  export default function Carousel({ DATA }) {
    const [scrollViewWidth, setScrollViewWidth] = useState(0);
    const boxWidth = scrollViewWidth * 0.8;
    const boxDistance = scrollViewWidth - boxWidth;
    const halfBoxDistance = boxDistance / 2;
    const pan = React.useRef(new Animated.ValueXY()).current;
  
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
        <View
          style={{
            height: "100%",
            width: boxWidth / 1.7,
            borderRadius: 60,
            overflow: 'hidden',
            backgroundColor : '#FFFFFF4B',
  
          }}
        >
          <View style={styles.infoContainer}>
            <View style={styles.iconContainer}>
              <View style={styles.icon}>
                <Ionicons name={JSON.parse(item.label).icon} size={25} color="#5798FF" iconStyle={{marginLeft : 20}} />
              </View>
              
            </View>
            
            <Text style={styles.title}>{JSON.parse(item.label).name}</Text>
          </View>
            

        </View>
      </Animated.View>
    );
  
    return (
      <View style={styles.container}>
        <FlatList
          horizontal
          data={DATA}
          style={{ height: 90 }}
          contentContainerStyle={{paddingVertical: 16 }}
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
  
  const styles = StyleSheet.create({
    title: {
      marginTop : '10%',
      marginLeft : 10,
      color : '#5798FF',
    },
    container: {
      marginTop: 10,
    },
    infoContainer: {
      flex: 1,
      flexDirection: "row",
      paddingLeft : 10,
    },
    iconContainer : {
      backgroundColor : '#ACCCFF',
      marginTop : '5%',
      borderRadius : 200,
      height : 40,
      width : 40,
    },
    icon:{
      marginLeft : 7,
      marginTop : 5,
    }
  });
  