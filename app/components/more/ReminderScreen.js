import React from 'react';
import {
  View,
  Modal,
  Platform,
  DatePickerIOS,
  TimePickerAndroid,
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
import { combinedReminderProps } from '../../lib/commonProps';

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
  onNotification: () => {},
});

const openTimePickerAndroid = async (date) => {
  try {
    const selectedHour = date.getHours();
    const selectedMinute = date.getMinutes();

    const {
      action,
      hour,
      minute,
    } = await TimePickerAndroid.open({
      hour: selectedHour,
      minute: selectedMinute,
      is24Hour: false,
    });
    if (action !== TimePickerAndroid.dismissedAction) {
      const todayDate = new Date();
      todayDate.setHours(hour);
      todayDate.setMinutes(minute);
      todayDate.setSeconds(0);

      return todayDate;
    }

    return null;
  } catch ({ code, message }) {
    return null;
  }
};

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

    props.setReminderDate(date);
    props.setReminderSelectedDay(day);

    if (Platform.OS === 'ios') {
      props.setReminderModalOldDate(date);
      props.toggleReminderModal();
    } else {
      openTimePickerAndroid(date).then((selectedDate) => {
        if (selectedDate !== null) {
          props.setReminderDate(selectedDate);
          props.setReminderSelectedDateIdTimeAsync();
        }
      });
    }
  },
  dateChange: (props, date) => {
    props.setReminderDate(date);
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
  if (Platform.OS === 'ios') {
    const { reminder } = props;

    const {
      modalVisible,
      datePickerDate,
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
                date={datePickerDate}
                mode="time"
                onDateChange={date => dateChange(props, date)}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  return (
    <View />
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
  // Modal is for iOS only
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

getModalJsx.propTypes = {
  reminder: { combinedReminderProps },
};
