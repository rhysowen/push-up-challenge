import React, { PropTypes } from 'react';
import {
   Animated,
   NavigationExperimental,
   StyleSheet,
   View,
} from 'react-native';

// Containers
import LoadingContainer from './config/LoadingContainer';
import ApplicationTabs from './ApplicationTabs';
import PreviewContainer from './exercise/PreviewContainer';
import ActivityContainer from './exercise/ActivityContainer';
import CompleteContainer from './exercise/CompleteContainer';
import InstructionContainer from './exercise/InstructionContainer';
import CreditContainer from './more/CreditContainer';
import MedicalInformationContainer from './more/MedicalInformationContainer';
import ReminderContainer from './more/ReminderContainer';
import SoundContainer from './more/SoundContainer';

const {
  Card: NavigationCard,
} = NavigationExperimental;

const {
  CardStackStyleInterpolator: NavigationPagerStyleInterpolator,
} = NavigationCard;

const styles = StyleSheet.create({
  scene: { flex: 1 },
});

const SceneContainer = (props) => {
  const style = [
    styles.scene,
    NavigationPagerStyleInterpolator.forHorizontal(props),
  ];

  let Scene;

  switch (props.scene.route.key) {
    case 'LoadingContainer':
      Scene = LoadingContainer;
      break;
    case 'ApplicationTabs':
      Scene = ApplicationTabs;
      break;
    case 'PreviewContainer':
      Scene = PreviewContainer;
      break;
    case 'ActivityContainer':
      Scene = ActivityContainer;
      break;
    case 'CompleteContainer':
      Scene = CompleteContainer;
      break;
    case 'CreditContainer':
      Scene = CreditContainer;
      break;
    case 'MedicalInformationContainer':
      Scene = MedicalInformationContainer;
      break;
    case 'ReminderContainer':
      Scene = ReminderContainer;
      break;
    case 'SoundContainer':
      Scene = SoundContainer;
      break;
    case 'InstructionContainer':
      Scene = InstructionContainer;
      break;
    default:
      Scene = View;
      break;
  }

  return (
    <Animated.View style={style}>
      {Scene !== null ? <Scene style={style} /> : <View />}
    </Animated.View>
  );
};

SceneContainer.propTypes = {
  scene: PropTypes.shape({
    route: PropTypes.shape({
      key: PropTypes.string.isRequired,
    }),
  }),
};

export default SceneContainer;
