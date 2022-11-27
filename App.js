import {  } from 'expo-status-bar';
import {  } from 'react-native';
import Authenticator from './src/pages/Authenticator';
import Home from './src/pages/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeTabs() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}


export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    // <View style={styles.container}>
    //   <StatusBar style="auto" />
    //   <Authenticator />
    // </View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={Authenticator} />
        <Stack.Screen name="Home" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

// const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
// });
