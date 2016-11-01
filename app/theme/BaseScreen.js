import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import AdvertBanner from '../components/shared/AdvertBanner';

import { BASE_BACKGROUND_COLOR } from './style';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: BASE_BACKGROUND_COLOR,
  },
  baseContainer: {
    flex: 1,
    paddingTop: 10,
  },
});

const renderAdvertJsx = (props) => {
  if (props.hideAdvert) {
    return (
      <View />
    );
  }

  return (
    <AdvertBanner />
  );
}

const BaseScreen = (props) => {
  const advertJsx = renderAdvertJsx(props);

  return (
    <View
      style={styles.wrapper}
    >
      {advertJsx}
      <View
        style={[styles.baseContainer, props.style]}
      >
        {props.children}
      </View>
    </View>
  );
};

export default BaseScreen;
