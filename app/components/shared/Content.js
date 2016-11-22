import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
} from '../../theme/style';
import ContentItem from './ContentItem';
import BaseScreen from '../../theme/BaseScreen';

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
  },
});

const getMainJsx = (props) => {
  const isDisableScrollView = typeof props.disableScrollView !== 'undefined' && disableScrollView;
  const Component = isDisableScrollView ? View : ScrollView;

  return (
    <Component
      style={[
        styles.wrapper,
        props.contentStyle,
      ]}
    >
      <BaseScreen
        style={props.innerContentStyle}
      >
        {props.children}
      </BaseScreen>
    </Component>
  );
};

const Content = props => getMainJsx(props);

export default Content;

Content.Item = ContentItem;
