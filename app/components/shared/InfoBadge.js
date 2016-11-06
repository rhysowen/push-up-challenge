import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Pro from './Pro';
import { INFO_STYLE } from '../../theme/style';
import InfoBase from './InfoBase';

const styles = StyleSheet.create({
  proWrapper: { paddingLeft: 5 },
  valueWrapper: { flexDirection: 'row' },
});

const getBadgeJsx = (props) => {
  if (props.mode) {
    return (
      <View
        style={styles.proWrapper}
      >
        <Pro />
      </View>
    );
  }

  return (
    <View />
  );
};

export default (props) => {
  const badgeJsx = getBadgeJsx(props);

  return (
    <InfoBase>
      <Text
        style={INFO_STYLE.title}
      >
        {props.title}
      </Text>
      <View
        style={styles.valueWrapper}
      >
        <Text
          style={INFO_STYLE.value}
        >
          {props.value}
        </Text>
        {badgeJsx}
      </View>
    </InfoBase>
  );
};
