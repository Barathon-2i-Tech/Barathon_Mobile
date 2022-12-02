import AsyncStorage from '@react-native-async-storage/async-storage';


export async function storeData(key, value){
      try {
          await AsyncStorage.setItem(key, value)
        } catch (e) {
          console.log(e)
        }
  }

  export async function storeDataObject(key, value){
      try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
          console.log(e)
        }
  }

  export async function getData(key){
      try {
          const value = await AsyncStorage.getItem(key)
          if(value !== null) {
            return value;
          }else{
              return false;
          }
        } catch(e) {
          return false;
        }
  }

  export async function getDataObject(key){
      try {
          const jsonValue = await AsyncStorage.getItem(key)
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
          return false;
        }
  }
