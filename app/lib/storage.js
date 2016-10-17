import { AsyncStorage } from 'react-native';

const SELECTED_PROGRAM_NAME = '@SELECTED_PROGRAM_NAME:key';
const SELECTED_DAY = '@SELECTED_DAY:key';
const STATISTICS = '@STATISTICS:key';

const setKey = async function setKey(key, data) {
  try {
    return await AsyncStorage.setItem(key, data);
  } catch (error) {
    return null;
  }
};

const getKey = async function getKey(key) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    return null;
  }
};

const mergeKey = async function mergeKey(key, data) {
  try {
    return await AsyncStorage.mergeItem(key, data);
  } catch (error) {
    return null;
  }
};

const removeKey = async function removeKey(key) {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    return null;
  }
};

export {
  SELECTED_PROGRAM_NAME,
  SELECTED_DAY,
  STATISTICS,
  setKey,
  getKey,
  removeKey,
  mergeKey,
};
