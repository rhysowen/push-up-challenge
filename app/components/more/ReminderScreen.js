import React from 'react';
import {
  View,
  Modal,
  DatePickerIOS,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import ScrollBaseScreen from '../shared/ScrollBaseScreen';
import Option from './Option';
import {
  TAB_COLOR,
  BASE_BACKGROUND_COLOR,
} from '../../theme/style';
import { REMINDER_ENABLED } from '../../lib/constants';
import getIconJsx from '../../lib/icon';
import { formatDate } from '../../lib/format';

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
});

const onPressActions = {
  cancelModal: (props) => {
    props.toggleReminderModal();
  },
  acceptModal: (props) => {
    props.saveReminderDayAsync();
    props.toggleReminderModal();
  },
  optionItem: (props, reminder, index) => {
    const { date } = reminder;

    props.setModalDate(date);
    props.setModalOldDate(date);
    props.setModalSelectedDateId(index);
    props.toggleReminderModal();
  },
  dateChange: (props, date) => {
    const { modalDatePickerDate } = props;

    props.setModalOldDate(modalDatePickerDate);
    props.setModalDate(date);
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
        style={{flex: 1, justifyContent: 'flex-end'}}
      >
        <View
          style={{ backgroundColor: TAB_COLOR }}
        >
          <View
            style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 25, paddingRight: 25,}}
          >
            {cancelTouchableIconJsx}
            {acceptTouchableIconJsx}
          </View>
          <View
            style={{backgroundColor: BASE_BACKGROUND_COLOR, paddingLeft: 25, paddingRight: 25, paddingTop: 5, paddingBottom: 5}}
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
        onValueChanged={() => console.log('todo')}
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
