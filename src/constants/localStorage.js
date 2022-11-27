import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage {
    async storeData(key, value){
        try {
            await AsyncStorage.setItem(key, value)
          } catch (e) {
            console.log(e)
          }
    }

    async storeDataObject(key, value){
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
          } catch (e) {
            console.log(e)
          }
    }

    async getData(key){
        try {
            const value = await AsyncStorage.getItem(key)
            console.log("value : ", value)
            if(value !== null) {
              return value;
            }else{
                return false;
            }
          } catch(e) {
            return false;
          }
    }

    async getDataObject(key){
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
          } catch(e) {
            return false;
          }
    }
}