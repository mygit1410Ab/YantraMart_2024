import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key: string, data: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('LS_ACT', e);
  }
};

const getItem = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    // console.log("getItem value", JSON.parse(jsonValue!));
    return jsonValue != null ? JSON.parse(jsonValue!) : null;
  } catch (e) {
    console.error('LS_ACT', e);
  }
};

const removeItem = async (key: string) => {
  // console.log(key);
  try {
    await AsyncStorage.removeItem(key, (d: any) => {
      // console.log('removed', d);
    });
  } catch (e) {
    console.error('LS_ACT', e);
  }
};
const clearAsyncStorage = async () => {
  AsyncStorage.clear();
};
const getAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    // console.log(keys);
  } catch (er) {
    console.error('LS_ACT', er);
  }
};

export default {setItem, getItem, removeItem, getAllKeys, clearAsyncStorage};
