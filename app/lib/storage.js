import { AsyncStorage } from 'react-native';

const SELECTED_PROGRAM_NAME = '@SELECTED_PROGRAM_NAME:key';
const SELECTED_DAY = '@SELECTED_DAY:key';

const setKey = async function(key, data) {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    // Log this?
  }
};

const getKey = async function(key) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    // Log this?
  }
};

export { 
  SELECTED_PROGRAM_NAME,
  SELECTED_DAY,
  setKey,
  getKey,
};
