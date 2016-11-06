import {
  Alert,
  NativeModules,
} from 'react-native';

const InAppUtils = NativeModules.InAppUtils;
const PRO_IDENTIFIER = 'com.digitalcompile.pushups.pro';
const PRODUCTS = [PRO_IDENTIFIER];

const purchaseProduct = (productIdentifier, props) => (
  InAppUtils.loadProducts(PRODUCTS, (loadError, loadProduct) => (
    InAppUtils.purchaseProduct(productIdentifier, (purchaseError, purchaseResponse) => {
      if (purchaseResponse && purchaseResponse.productIdentifier) {
        props.activateProMode();

        Alert.alert(
          'Push-Ups Coach Pro Unlocked!',
          'Advertisements have been removed & all programs are now available.',
          { text: 'OK' }
        );
      }
    })
  ))
);

export default (props) => {
  Alert.alert(
    'Upgrade to Pro',
    'Unlock all programs & remove advertisements',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Upgrade',
        onPress: () => purchaseProduct(PRO_IDENTIFIER, props),
      },
    ]
  );
};
