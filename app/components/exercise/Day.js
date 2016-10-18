import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    padding: 15,
  },
  dayWrapper: { flex: 1 },
  textDay: { fontSize: 16 },
  setsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  setText: { color: '#777777' },
});

const renderSetsJsx = (props) => {
  const { sets } = props;

  return sets.map((set, key) =>
    <Text
      key={key}
      style={styles.setText}
    >
      {set}
    </Text>
  );
};

export default (props) => {
  const setsJsx = renderSetsJsx(props);

  return (
    <View
      style={[styles.wrapper, props.style]}
    >
      <View
        style={styles.dayWrapper}
      >
        <Text
          style={styles.textDay}
        >
          Day {props.day}
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
