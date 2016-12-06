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
} from '../../lib/ads';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: BASE_BACKGROUND_COLOR,
    alignItems: 'center',
  },
});

const AdvertBanner = (props) => {
  if (props.hideBanner) {
    return (
      <View />
    );
  }

  const style = {
    width: props.bannerWidth,
    height: props.bannerHeight,
  };

  return (
    <View
      style={styles.wrapper}
    >
      <AdMobBanner
        bannerSize={props.bannerSize}
        adUnitID={BANNER_AD_UNIT_ID}
        testDeviceID={TEST_DEVICE_ID}
        style={style}
      />
    </View>
  );
};

AdvertBanner.propTypes = {
  hideBanner: React.PropTypes.bool,
  bannerWidth: React.PropTypes.number,
  bannerHeight: React.PropTypes.number,
  bannerSize: React.PropTypes.string,
};

export default AdvertBanner;
