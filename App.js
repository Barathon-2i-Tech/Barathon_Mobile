import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Authenticator from './src/pages/Authenticator';




export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Authenticator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
