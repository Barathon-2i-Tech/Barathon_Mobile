import {} from "expo-status-bar";
import {  StyleSheet } from "react-native";
import Authenticator from "./src/pages/Authenticator";
import Home from "./src/pages/Home";
import Event from "./src/pages/Event";
import Establishment from "./src/pages/Establishment";
import EventsByCategory from "./src/pages/EventsByCategory";
import Search from "./src/pages/Search";
import QrCode from "./src/pages/QrCode";
import Ticket from "./src/pages/Ticket";
import Dashboard from "./src/pages/Dashboard";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function HomeTabs() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      activeColor="#FC1055"
      inactiveColor="#CACDD4"
      barStyle={styles.color}
    
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="Search"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
        component={Search}
      />
      <Tab.Screen
        name="Notif"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="qrcode" color={color} size={26} />
          ),
        }}
        component={Ticket}
      />
      <Tab.Screen
        name="Dashboard"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle-outline" color={color} size={26} />
          ),
        }}
        component={Dashboard}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Auth"
          component={Authenticator}
        />
        <Stack.Screen options={{ headerShown: false }} name="HomeStack" component={HomeTabs} />
        <Stack.Screen options={{ headerShown: false }} name="Event" component={Event} />
        <Stack.Screen options={{ headerShown: false }} name="Establishment" component={Establishment} />
        <Stack.Screen options={{ headerShown: false }} name="QrCode" component={QrCode} />
        <Stack.Screen options={{ headerShown: false }} name="EventsByCategory" component={EventsByCategory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const white = "white";
const styles = StyleSheet.create({
  color: {
    backgroundColor : white
  },
});
