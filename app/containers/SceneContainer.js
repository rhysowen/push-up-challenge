import React, { PropTypes } from 'react';
import {
   Animated,
   NavigationExperimental,
   StyleSheet,
   View,
} from 'react-native';

// Containers
import ApplicationTabs from './ApplicationTabs';
import PreviewContainer from './PreviewContainer';
import ExerciseContainer from './ExerciseContainer';

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

  let Scene = ExerciseContainer;

  switch (props.scene.route.key) {
    case 'ApplicationTabs':
      Scene = ApplicationTabs;
      break;
    case 'PreviewContainer':
      Scene = PreviewContainer;
      break;
    case 'ExerciseContainer':
      Scene = ExerciseContainer;
      break;
    default:
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
