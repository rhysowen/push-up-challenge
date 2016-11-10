import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';

const exerciseGif = require('../../theme/images/screen/shared/exercise.gif');

export default () => (
  <View style={{flex: 1}}>
    <Image source={exerciseGif} style={{width: null, height: null, flex: 1}} resizeMode="contain" />
    <View>
      <Text>Keep in mind that ScrollViews must have a bounded height in order to work, since they contain unbounded-height children into a bounded container (via a scroll interaction). In order to bound the height of a ScrollView, either set the height of the view directly (discouraged) or make sure all parent views have bounded height.</Text>
    </View>
  </View>
);
