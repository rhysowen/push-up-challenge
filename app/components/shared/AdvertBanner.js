import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { AdMobBanner } from 'react-native-admob';

import { BASE_BACKGROUND_COLOR } from '../../theme/style';

import {
  TEST_DEVICE_ID,
  BANNER_AD_UNIT_ID,
  SMART_BANNER_HEIGHT,
} from '../../lib/ads';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: BASE_BACKGROUND_COLOR,
    minHeight: SMART_BANNER_HEIGHT,
    alignItems: 'center',
  },
  bannerStyle: {
    width: 320,
    height: 50,
  },
});

const BANNER_SIZE = 'banner';

const AdvertBanner = (props) => {
  if (props.hideBanner) {
    return (
      <View />
    );
  }

  return (
    <View
      style={styles.wrapper}
    >
      <AdMobBanner
        bannerSize={BANNER_SIZE}
        adUnitID={BANNER_AD_UNIT_ID}
        testDeviceID={TEST_DEVICE_ID}
        style={styles.bannerStyle}
      />
    </View>
  );
};

AdvertBanner.propTypes = { hideBanner: React.PropTypes.bool };

export default AdvertBanner;
