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
import CreditContainer from './more/CreditContainer';
import MedicalInformationContainer from './more/MedicalInformationContainer';
import NotificationContainer from './more/NotificationContainer';
import SoundContainer from './more/SoundContainer';

const {
  Card: NavigationCard,
} = NavigationExperimental;

const {
  PagerStyleInterpolator: NavigationPagerStyleInterpolator,
} = NavigationCard;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
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
    case 'NotificationContainer':
      Scene = NotificationContainer;
      break;
    case 'SoundContainer':
      Scene = SoundContainer;
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
