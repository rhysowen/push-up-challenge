import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  COLOR_ORANGE,
  BASE_FONT_FAMILY_IOS,
} from '../../theme/style';

const styles = StyleSheet.create({
  section: { paddingBottom: 10 },
  header: {
    fontFamily: BASE_FONT_FAMILY_IOS,
    fontSize: 18,
    color: COLOR_ORANGE,
    paddingBottom: 10,
  },
  content: {
    fontFamily: BASE_FONT_FAMILY_IOS,
    fontSize: 14,
    lineHeight: 20,
  },
});

const ContentItem = props => (
  <View
    style={styles.section}
  >
    <Text
      style={styles.header}
    >
      {props.header}
    </Text>
    <Text
      style={styles.content}
    >
      {props.content}
    </Text>
  </View>
);

ContentItem.propTypes = {
  header: React.PropTypes.string,
  content: React.PropTypes.string,
};

export default ContentItem;
