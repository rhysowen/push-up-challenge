import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Info from '../shared/Info';
import BaseScreen from '../../theme/BaseScreen';
import {
  COLOR_ORANGE,
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
  BASE_FONT_FAMILY_IOS,
} from '../../theme/style';
import DefaultButton from '../../theme/DefaultButton';
import { NOT_SET } from '../../lib/constants';

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  exerciseCompleteText: {
    color: COLOR_ORANGE,
    fontFamily: BASE_FONT_FAMILY_IOS,
    fontSize: 22,
  },
});

const onDashboardPress = (props) => {
  props.setTab(0);
  props.navigateReset({
    key: 'ApplicationTabs',
    title: NOT_SET,
  });
};

const CompleteScreen = (props) => {
  const { exercise } = props;

  return (
    <BaseScreen
      style={styles.wrapper}
    >
      <View
      style={{flex: 1, alignItems: 'center'}}>
        <Text
          style={styles.exerciseCompleteText}
        >
          Exercise Complete
        </Text>
      </View>
      <View
      style={{flex: 2, justifyContent: 'space-between'}}>
        <Info
          title="Total Reps"
          value="154"
        />
        <Info
          title="Calories"
          value="240"
        />
        <Info
          title="Time Elapsed"
          value="5m 34s"
        />
      </View>
      <View
        style={{flex: 2, justifyContent: 'center'}}
      >
        <DefaultButton
          name="Back to dashboard"
          buttonColor={COLOR_ORANGE}
          textColor="white"
          onPress={() => onDashboardPress(props)}
        />
      </View>

    </BaseScreen>
  );
};

CompleteScreen.propTypes = {
  // programs: PropTypes.object,
};

export default CompleteScreen;
