import {
  Alert,
  NativeModules,
} from 'react-native';

import { PRO_ENABLED } from '../lib/constants';

const InAppUtils = NativeModules.InAppUtils;
const PRO_IDENTIFIER = 'com.digitalcompile.pushups.pro';
const PRODUCTS = [PRO_IDENTIFIER];
const PRO_MESSAAGE = 'Adverts have been removed & all programs are now available.';

const purchaseProduct = (productIdentifier, props) => (
  InAppUtils.loadProducts(PRODUCTS, () => (
    InAppUtils.purchaseProduct(productIdentifier, (purchaseError, purchaseResponse) => {
      if (purchaseResponse && purchaseResponse.productIdentifier) {
        props.activateProMode();

        Alert.alert(
          'Pro Unlocked!',
          PRO_MESSAAGE,
          { text: 'OK' },
        );
      }
    })
  ))
);

export const isProEnabled = proMode => proMode === PRO_ENABLED;

export const upgrade = (props) => {
  Alert.alert(
    'Upgrade to Pro',
    'Remove adverts & unlock all programs.',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Upgrade',
        onPress: () => purchaseProduct(PRO_IDENTIFIER, props),
      },
    ],
  );
};

export const restorePurchases = props => (
  InAppUtils.restorePurchases((error, response) => {
    if (error) {
      Alert.alert('Error', 'Unable to connect to iTunes Store.');
    } else {
      const proIdentiferFilterResponse =
        response instanceof Array ?
          response.filter(r => r.productIdentifier === PRO_IDENTIFIER)
          : [];
      if (proIdentiferFilterResponse.length > 0) {
        props.activateProMode();

        Alert.alert('Restore Successful', PRO_MESSAAGE);
      } else {
        Alert.alert('Restore Failed', 'There are no items available to restore.');
      }
    }
  })
);
