import React from 'react';
import {
   Animated,
   NavigationExperimental,
   StyleSheet,
} from 'react-native';

import ApplicationTabs from './ApplicationTabs';
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
  }
});

export default (props) => {
  const style = [
    styles.scene,
    NavigationPagerStyleInterpolator.forHorizontal(props),
  ];

  const { containerProps } = props;

  let Scene = null;

  if (props.scene.route.key === 'ApplicationTabs') { Scene = ApplicationTabs; }
  if (props.scene.route.key === 'ExerciseContainer') { Scene = ExerciseContainer; }

  return (
    <Animated.View style={style}>
      <Scene style={style} {...props} {...containerProps} />
    </Animated.View>
  );
};
