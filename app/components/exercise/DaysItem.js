import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  LINE_COLOR,
  BASE_FONT_FAMILY_IOS,
  FADE_COLOR,
} from '../../theme/style';

const styles = StyleSheet.create({
  repsWrapper: { flexDirection: 'row' },
  dayWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  setsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  fadeText: {
    fontFamily: BASE_FONT_FAMILY_IOS,
    color: FADE_COLOR,
  },
  baseText: {
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
});

const getWrapperStyle = (props) => {
  const isLastItem = typeof props.lastItem !== 'undefined' && props.lastItem;

  const wrapper = {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  };

  const borderStyle = {
    borderBottomColor: LINE_COLOR,
    borderBottomWidth: 1,
  };

  if (isLastItem) {
    return wrapper;
  }

  return Object.assign(
    {},
    wrapper,
    borderStyle
  );
};

const getRepJsx = (isLastSet, rep, index) => {
  const baseRepJsx = (
    <Text
      style={styles.baseText}
    >
      {rep}
    </Text>
  );

  if (isLastSet) {
    return (
      <View
        key={index}
      >
        {baseRepJsx}
      </View>
    );
  }

  const separator = ' - ';

  return (
    <View
      key={index}
      style={styles.repsWrapper}
    >
      {baseRepJsx}
      <Text
        style={styles.fadeText}
      >
        {separator}
      </Text>
    </View>
  );
};

const getSetsJsx = (props) => {
  const setCount = props.sets.length;

  return props.sets.map((set, index) => {
    const isLastSet = (index + 1) === setCount;
    const repJsx = getRepJsx(isLastSet, set, index);

    return repJsx;
  });
};

export default (props) => {
  const wrapperStyle = getWrapperStyle(props);
  const setsJsx = getSetsJsx(props);
  const dayText = 'Day ';

  return (
    <View
      style={wrapperStyle}
    >
      <View
        style={styles.dayWrapper}
      >
        <Text
          style={styles.fadeText}
        >
          {dayText}
        </Text>
        <Text
          style={styles.baseText}
        >
          {props.day}
        </Text>
      </View>
      <View
        style={styles.setsWrapper}
      >
        {setsJsx}
      </View>
    </View>
  );
};
