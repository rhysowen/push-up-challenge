import {
  Alert,
  NativeModules,
} from 'react-native';

const InAppUtils = NativeModules.InAppUtils;
const PRO_IDENTIFIER = 'com.digitalcompile.pushups.pro';
const PRODUCTS = [PRO_IDENTIFIER];

const purchaseProduct = productIdentifier => (
  InAppUtils.loadProducts(PRODUCTS, (loadError, loadProduct) => (
    InAppUtils.purchaseProduct(productIdentifier, (purchaseError, purchaseResponse) => {
      if (purchaseResponse && purchaseResponse.productIdentifier) {
        Alert.alert(
          'Purchase Successful',
          'Push-Ups Coach Pro Unlocked!',
          { text: 'OK', onPress: () => console.log('Ok Pressed') }
        );
      }
    })
  ))
);

export default () => {
  Alert.alert(
    'Upgrade to Pro',
    'Unlock all programs & remove ads',
    [
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      { text: 'Upgrade', onPress: () => purchaseProduct(PRO_IDENTIFIER) },
    ]
  );
};
