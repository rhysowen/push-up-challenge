import React from 'react';
import {
  View,
  Modal,
  DatePickerIOS,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import PushNotification from 'react-native-push-notification';

import ScrollBaseScreen from '../shared/ScrollBaseScreen';
import Option from './Option';
import {
  TAB_COLOR,
  BASE_BACKGROUND_COLOR,
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
} from '../../theme/style';
import { REMINDER_ENABLED } from '../../lib/constants';
import getIconJsx from '../../lib/icon';
import { formatDate } from '../../lib/format';

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalTopWrapper: { backgroundColor: TAB_COLOR },
  modalTopOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
    paddingTop: 5,
    paddingBottom: 5,
  },
  modalContentWrapper: {
    backgroundColor: BASE_BACKGROUND_COLOR,
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
    paddingTop: 5,
    paddingBottom: 5,
  },
});

PushNotification.configure({
  onNotification: (notification) => {
    console.log('NOTIFICATION:', notification);
  },
});

const onPressActions = {
  cancelModal: (props) => {
    props.toggleReminderModal();
  },
  acceptModal: (props) => {
    props.setReminderSelectedDateIdTimeAsync();
    props.toggleReminderModal();
  },
  optionItem: (props, reminder) => {
    const {
      date,
      day,
    } = reminder;

    props.setReminderModalDate(date);
    props.setReminderModalOldDate(date);
    props.setReminderModalSelectedDay(day);
    props.toggleReminderModal();
  },
  dateChange: (props, date) => {
    props.setReminderModalDate(date);
  },
};

const getTouchableIconJsx = (iconJsx, callback) => (
  <TouchableOpacity
    onPress={() => callback()}
  >
    {iconJsx}
  </TouchableOpacity>
);

const getModalJsx = (props) => {
  const { reminder } = props;

  const {
    modalVisible,
    modalDatePickerDate,
  } = reminder;

  const {
    cancelModal,
    acceptModal,
    dateChange,
  } = onPressActions;

  const cancelIconJsx = getIconJsx(Icon, 'close');
  const acceptIconJsx = getIconJsx(Icon, 'check');

  const cancelTouchableIconJsx = getTouchableIconJsx(cancelIconJsx, () => cancelModal(props));
  const acceptTouchableIconJsx = getTouchableIconJsx(acceptIconJsx, () => acceptModal(props));

  return (
    <Modal
      animationType={'slide'}
      transparent
      visible={modalVisible}
    >
      <View
        style={styles.modalWrapper}
      >
        <View
          style={styles.modalTopWrapper}
        >
          <View
            style={styles.modalTopOptions}
          >
            {cancelTouchableIconJsx}
            {acceptTouchableIconJsx}
          </View>
          <View
            style={styles.modalContentWrapper}
          >
            <DatePickerIOS
              date={modalDatePickerDate}
              mode="time"
              onDateChange={date => dateChange(props, date)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const getOptionsJsx = (props) => {
  const { reminder } = props;

  const { days } = reminder;

  const { optionItem } = onPressActions;

  return days.map((val, index) => {
    const value = val.mode === REMINDER_ENABLED;
    const onPress = () => optionItem(props, val, index);
    const time = formatDate(val.date);

    return (
      <Option.Item
        key={index}
        onPress={onPress}
        primaryText={val.day}
        secondaryText={time}
        value={value}
        onValueChanged={() => props.toggleReminderSwitchAsync(val.day)}
      />
    );
  });
};

export default (props) => {
  const modalJsx = getModalJsx(props);
  const optionsJsx = getOptionsJsx(props);

  return (
    <View
      style={styles.wrapper}
    >
      {modalJsx}
      <ScrollBaseScreen>
        <Option>
          {optionsJsx}
        </Option>
      </ScrollBaseScreen>
    </View>
  );
};
