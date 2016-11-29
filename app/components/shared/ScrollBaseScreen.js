import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';

import BaseScreen from './BaseScreen';
import { childrenProps } from '../../lib/commonProps';

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  baseScreenWrapper: { paddingTop: 0 },
});

const ScrollBaseScreen = (props) => {
  const wrapperStyle = [
    styles.wrapper,
    props.scrollStyle,
  ];

  const baseScreenWrapper = [
    styles.baseScreenWrapper,
    props.baseStyle,
  ];

  return (
    <ScrollView
      style={wrapperStyle}
    >
      <BaseScreen
        style={baseScreenWrapper}
      >
        {props.children}
      </BaseScreen>
    </ScrollView>
  );
};

ScrollBaseScreen.propTypes = {
  scrollStyle: React.PropTypes.number,
  baseStyle: React.PropTypes.number,
  children: childrenProps,
};

export default ScrollBaseScreen;
