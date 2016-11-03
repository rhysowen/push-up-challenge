import React, {
  PropTypes,
} from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TabNavigator from 'react-native-tab-navigator';

import ActionCreators from '../actions';

// Screen containers
import RoutineContainer from './RoutineContainer';
import ProgramContainer from './ProgramContainer';
import StatisticContainer from './StatisticContainer';
import MoreContainer from './more/MoreContainer';

// Styles
import { TAB_COLOR } from '../theme/style';

const propTypes = {
  setTab: PropTypes.func,
  tabs: PropTypes.object,
  index: PropTypes.number,
};

const pushUpImage = require('../theme/images/tabs/PushUp.png');
const pushUpSelectedImage = require('../theme/images/tabs/PushUpSelected.png');
const programImage = require('../theme/images/tabs/Program.png');
const programSelectedImage = require('../theme/images/tabs/ProgramSelected.png');
const statsImage = require('../theme/images/tabs/Stats.png');
const statsSelectedImage = require('../theme/images/tabs/StatsSelected.png');
const moreImage = require('../theme/images/tabs/More.png');
const moreSelectedImage = require('../theme/images/tabs/MoreSelected.png');

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  tabNavigator: {
    backgroundColor: TAB_COLOR,
  },
  pushUpImage: {
    width: 40,
    height: 24,
  },
  programImage: {
    width: 35,
    height: 25,
  },
  statsImage: {
    width: 35,
    height: 25,
  },
  moreImage: {
    width: 35,
    height: 25,
  },
});

const CONTAIN_MODE = 'contain';

const imageJsxGen = (image, style, resizeMode = 'cover') => (
  <Image source={image} style={style} resizeMode={resizeMode} />
);

const ApplicationTabs = props => (
  <View
    style={styles.wrapper}
  >
    <TabNavigator
      tabBarStyle={styles.tabNavigator}
    >
      <TabNavigator.Item
        selected={props.tabs.index === 0}
        onPress={() => props.setTab(0)}
        renderIcon={() => imageJsxGen(pushUpImage, styles.pushUpImage, CONTAIN_MODE)}
        renderSelectedIcon={() => imageJsxGen(pushUpSelectedImage, styles.pushUpImage, CONTAIN_MODE)}
      >
        {<RoutineContainer />}
      </TabNavigator.Item>
      <TabNavigator.Item
        selected={props.tabs.index === 1}
        onPress={() => props.setTab(1)}
        renderIcon={() => imageJsxGen(programImage, styles.programImage, CONTAIN_MODE)}
        renderSelectedIcon={() => imageJsxGen(programSelectedImage, styles.programImage, CONTAIN_MODE)}
      >
        {<ProgramContainer />}
      </TabNavigator.Item>
      <TabNavigator.Item
        selected={props.tabs.index === 2}
        onPress={() => props.setTab(2)}
        renderIcon={() => imageJsxGen(statsImage, styles.statsImage, CONTAIN_MODE)}
        renderSelectedIcon={() => imageJsxGen(statsSelectedImage, styles.statsImage, CONTAIN_MODE)}
      >
        {<StatisticContainer />}
      </TabNavigator.Item>
      <TabNavigator.Item
        selected={props.tabs.index === 3}
        onPress={() => props.setTab(3)}
        renderIcon={() => imageJsxGen(moreImage, styles.moreImage, CONTAIN_MODE)}
        renderSelectedIcon={() => imageJsxGen(moreSelectedImage, styles.moreImage, CONTAIN_MODE)}
      >
        {<MoreContainer />}
      </TabNavigator.Item>
    </TabNavigator>
  </View>
);

ApplicationTabs.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    tabs: state.tabs,
  };
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationTabs);
