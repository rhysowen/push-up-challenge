import {
  Alert,
  NativeModules,
  Platform,
} from 'react-native';

import InAppBilling from 'react-native-billing';

import { PRO_ENABLED } from '../lib/constants';

const InAppUtils = NativeModules.InAppUtils;
const PRO_IDENTIFIER = 'com.digitalcompile.pushups.pro';
const PRODUCTS = [PRO_IDENTIFIER];
const PRO_MESSAAGE = 'Adverts have been removed & all programs are now available.';

const purchaseProductIOS = (productIdentifier, props) => (
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

const purchaseProductAndroid = async (productIdentifier, props) => {
  await InAppBilling.close();
  try {
    await InAppBilling.open();
    if (!await InAppBilling.isPurchased(productIdentifier)) {
      await InAppBilling.purchase(productIdentifier).then((purchased) => {
        if (purchased) {
          props.activateProMode();
        }
      });
    } else {
      props.activateProMode();
      await InAppBilling.open();
    }
  } catch (err) {
    // Handle this?
  } finally {
    await InAppBilling.close();
  }
};

const purchaseProduct = (productIdentifier, props) => {
  if (Platform.OS === 'ios') {
    return purchaseProductIOS(productIdentifier, props);
  }

  return purchaseProductAndroid(productIdentifier, props);
};


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

const restorePurchasesIOS = (productIdentifier, props) => (
  InAppUtils.restorePurchases((error, response) => {
    if (error) {
      Alert.alert('Error', 'Unable to connect to iTunes Store.');
    } else {
      const proIdentiferFilterResponse =
        response instanceof Array ?
          response.filter(r => r.productIdentifier === productIdentifier)
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

export const restorePurchases = (props) => {
  if (Platform.OS === 'ios') {
    return restorePurchasesIOS(PRO_IDENTIFIER, props);
  }

  // We can re-use this for Android.
  return purchaseProductAndroid(PRO_IDENTIFIER, props);
};
