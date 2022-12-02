import {} from "expo-status-bar";
import {} from "react-native";
import Authenticator from "./src/pages/Authenticator";
import Home from "./src/pages/Home";
import SearchEvent from "./src/pages/SearchEvent";
import Notification from "./src/pages/Notification";
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
      barStyle={{ backgroundColor: '#FFFFFF' }}
    
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
        component={SearchEvent}
      />
      <Tab.Screen
        name="Notif"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
        component={Notification}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
