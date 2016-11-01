import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { AdMobBanner } from 'react-native-admob';

import {
  TEST_DEVICE_ID,
  BANNER_AD_UNIT_ID,
  SMART_BANNER_HEIGHT,
} from '../../lib/ads';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    minHeight: SMART_BANNER_HEIGHT,
  },
});

const BANNER_SIZE = 'smartBannerPortrait';

export default () => (
  <View
    style={styles.wrapper}
  >
    <AdMobBanner
      bannerSize={BANNER_SIZE}
      adUnitID={BANNER_AD_UNIT_ID}
      testDeviceID={TEST_DEVICE_ID}
    />
  </View>
);
