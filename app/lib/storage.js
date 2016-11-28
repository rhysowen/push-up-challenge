import { AsyncStorage } from 'react-native';

const PROGRAM = '@PROGRAM:key';
const EXERCISE = '@EXERCISE:key';
const STATISTICS = '@STATISTICS:key';
const REMINDER = '@REMINDER:key';
const SOUND = '@SOUND:key';
const UTIL = '@UTIL:key';
const ANALYTICS = '@ANALYTICS:key';

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
  PROGRAM,
  EXERCISE,
  STATISTICS,
  REMINDER,
  SOUND,
  UTIL,
  ANALYTICS,
  setKey,
  getKey,
  removeKey,
  mergeKey,
};
