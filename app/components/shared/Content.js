import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';

import {
  COLOR_ORANGE,
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
  BASE_FONT_FAMILY_IOS,
} from '../../theme/style';
import BaseScreen from '../../theme/BaseScreen';
import ContentItem from './ContentItem';

const styles = StyleSheet.create({
  scrollWrapper: {
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
  },
  section: { paddingBottom: 20 },
  content: {
    fontFamily: BASE_FONT_FAMILY_IOS,
    fontSize: 16,
  },
  header: {
    fontFamily: BASE_FONT_FAMILY_IOS,
    fontSize: 18,
    color: COLOR_ORANGE,
    paddingBottom: 10,
  },
});

const Content = props => (
  <BaseScreen>
    <ScrollView
      style={styles.scrollWrapper}
    >
      {props.children}
    </ScrollView>
  </BaseScreen>
);

export default Content;

Content.Item = ContentItem;
