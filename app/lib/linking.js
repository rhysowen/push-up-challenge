import { Linking } from 'react-native';

export default url => (
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      return Linking.openURL(url);
    }

    return -1;
  }).catch(err => console.error('An error occurred', err))
);
