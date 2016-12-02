import { Platform } from 'react-native';

import ProximityIOS from 'react-native-proximity';
import ProximityAndroid from 'react-native-proximity-android';

const start = (callback) => {
  if (Platform.OS === 'ios') {
    ProximityIOS.addListener(callback);
  } else {
    ProximityAndroid.startListener(callback);
  }
};

const stop = (callback) => {
  if (Platform.OS === 'ios') {
    ProximityIOS.removeListener(callback);
  } else {
    ProximityAndroid.stopListener(callback);
  }
};

module.exports = {
  start,
  stop,
};

