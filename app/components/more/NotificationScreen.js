import React from 'react';
import {
  Switch,
  Text,
  StyleSheet,
} from 'react-native';

import BaseScreen from '../../theme/BaseScreen';
import Option from './Option';
import { BASE_FONT_FAMILY_IOS } from '../../theme/style';
import { NOTIFICATION_ENABLED } from '../../lib/constants';

const styles = StyleSheet.create({
  timeItem: {
    fontFamily: BASE_FONT_FAMILY_IOS,
    fontSize: 16,
  },
});

export default (props) => {
  const { notification } = props;

  const NOTIFICATION_VALUE = notification.mode === NOTIFICATION_ENABLED;
  const NOTIFICATION = 'Notification';
  const NOTIFICATION_ITEM = (
    <Switch
      onValueChange={() => props.toggleNotification()}
      value={NOTIFICATION_VALUE}
    />
  );

  const TIME = 'Time';
  const TIME_ITEM = (
    <Text
      style={styles.timeItem}
    >
      10:04pm
    </Text>
  );

  return (
    <BaseScreen>
      <Option>
        <Option.Item
          text={NOTIFICATION}
          item={NOTIFICATION_ITEM}
        />
        <Option.Item
          text={TIME}
          item={TIME_ITEM}
        />
      </Option>
    </BaseScreen>
  );
};
