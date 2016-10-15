import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { COLOR_ORANGE } from '../../theme/style';
import DefaultButton from '../../theme/DefaultButton';

const CompleteScreen = (props) => {
  const { exercise } = props;

  return (
    <FullScreen>
      <Text>New Record!</Text>
      <View>
        <Text>6</Text>
        <Text>Push-Ups</Text>
      </View>
      <View>
        <Text>Summary here</Text>
      </View>
      <View>
        <DefaultButton
          name="Share"
          buttonColor={COLOR_ORANGE}
          textColor="white"
          onPress={() => console.log('Todo')}
        />
      </View>

    </FullScreen>
  );
};

CompleteScreen.propTypes = {
  // programs: PropTypes.object,
};

export default CompleteScreen;
