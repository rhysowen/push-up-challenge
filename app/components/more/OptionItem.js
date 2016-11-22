import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import {
  BASE_PADDING_TOP,
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
  BASE_FONT_FAMILY_IOS,
} from '../../theme/style';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flex: 1,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
    alignItems: 'center',
    minHeight: 50,
    paddingTop: BASE_PADDING_TOP,
    paddingBottom: 10,
  },
  textWrapper: {
    flex: 1,
  },
  text: {
    fontFamily: BASE_FONT_FAMILY_IOS,
    fontSize: 16,
  },
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default props => (
  <View
    style={styles.wrapper}
  >
    <View
      style={styles.contentWrapper}
    >
      <View
        style={styles.textWrapper}
      >
        <Text
          style={styles.text}
        >
          {props.text}
        </Text>
      </View>
      <View
        style={styles.itemWrapper}
      >
        {props.item}
      </View>
    </View>
  </View>
);
