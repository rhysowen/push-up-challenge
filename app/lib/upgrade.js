import { Alert } from 'react-native';

export default () => {
  Alert.alert(
    'Upgrade to Pro',
    'Unlock all programs & remove ads',
    [
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      { text: 'Upgrade', onPress: () => console.log('Upgrade Pressed') },
    ]
  );
};
