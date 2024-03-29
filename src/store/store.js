import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, value) => {

    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      console.log("Error en saveData:" + e);
    }
}

export const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log("Error en getData:" + e);
    }
}

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch(e) {
      console.log("Error en removetData:" + e);
  }
}
  