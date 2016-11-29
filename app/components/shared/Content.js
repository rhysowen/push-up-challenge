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
import BaseScreen from '../shared/BaseScreen';

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
  },
});

const getMainJsx = (props) => {
  const isDisableScrollView = typeof props.disableScrollView !== 'undefined' && props.disableScrollView;
  const Component = isDisableScrollView ? View : ScrollView;

  const wrapperStyle = [
    styles.wrapper,
    props.contentStyle,
  ];

  return (
    <Component
      style={wrapperStyle}
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

Content.Item = ContentItem;

getMainJsx.propTypes = {
  contentStyle: React.PropTypes.number,
  disableScrollView: React.PropTypes.bool,
  innerContentStyle: React.PropTypes.number,
  children: React.PropTypes.element,
};

export default Content;
