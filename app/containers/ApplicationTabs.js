import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';

import ActionCreators from '../actions';
import RoutineContainer from './RoutineContainer';
import ProgramContainer from './ProgramContainer';
import StatisticContainer from './StatisticContainer';
import MoreContainer from './more/MoreContainer';
import {
  TAB_COLOR,
  COLOR_ORANGE,
  BASE_FONT_FAMILY_IOS,
} from '../theme/style';
import getIconJsx from '../lib/icon';
import { tabProps } from '../lib/commonProps';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  tabNavigator: {
    backgroundColor: TAB_COLOR,
  },
  tabStyleSelected: {
    backgroundColor: COLOR_ORANGE,
  },
  titleStyleSelected: {
    color: 'white',
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
  titleStyle: {
    color: '#CCCCCC',
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
});

const selectTab = (props, tabIndex) => {
  props.incrementPositiveAnalytics();
  props.setTab(tabIndex);
};

const ApplicationTabs = (props) => {
  const { tabs } = props;

  const tabIconStyle = [25, '#CCCCCC'];
  const tabIconSelectedStyle = [25, 'white'];

  const routineIconJsx = getIconJsx(Icon, 'user', ...tabIconStyle);
  const routineSelectedIconJsx = getIconJsx(Icon, 'user', ...tabIconSelectedStyle);

  const programIconJsx = getIconJsx(Icon, 'list-alt', ...tabIconStyle);
  const programSelectedIconJsx = getIconJsx(Icon, 'list-alt', ...tabIconSelectedStyle);

  const statisticIconJsx = getIconJsx(Icon, 'line-chart', ...tabIconStyle);
  const statisticSelectedIconJsx = getIconJsx(Icon, 'line-chart', ...tabIconSelectedStyle);

  const moreIconJsx = getIconJsx(Icon, 'ellipsis-h', ...tabIconStyle);
  const moreSelectedIconJsx = getIconJsx(Icon, 'ellipsis-h', ...tabIconSelectedStyle);

  const routineSelected = tabs.index === 0;
  const programSelected = tabs.index === 1;
  const statisticSelected = tabs.index === 2;
  const moreSelected = tabs.index === 3;

  return (
    <View
      style={styles.wrapper}
    >
      <TabNavigator
        tabBarStyle={styles.tabNavigator}
      >
        <TabNavigator.Item
          selected={routineSelected}
          onPress={() => props.setTab(0)}
          title="Routine"
          titleStyle={routineSelected ? styles.titleStyleSelected : styles.titleStyle}
          tabStyle={routineSelected ? styles.tabStyleSelected : null}
          renderIcon={() => routineIconJsx}
          renderSelectedIcon={() => routineSelectedIconJsx}
        >
          {<RoutineContainer />}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={programSelected}
          onPress={() => props.setTab(1)}
          title="Program"
          titleStyle={programSelected ? styles.titleStyleSelected : styles.titleStyle}
          tabStyle={programSelected ? styles.tabStyleSelected : null}
          renderIcon={() => programIconJsx}
          renderSelectedIcon={() => programSelectedIconJsx}
        >
          {<ProgramContainer />}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={statisticSelected}
          onPress={() => props.setTab(2)}
          title="Statistics"
          titleStyle={statisticSelected ? styles.titleStyleSelected : styles.titleStyle}
          tabStyle={statisticSelected ? styles.tabStyleSelected : null}
          renderIcon={() => statisticIconJsx}
          renderSelectedIcon={() => statisticSelectedIconJsx}
        >
          {<StatisticContainer />}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={moreSelected}
          onPress={() => selectTab(props, 3)}
          title="More"
          titleStyle={moreSelected ? styles.titleStyleSelected : styles.titleStyle}
          tabStyle={moreSelected ? styles.tabStyleSelected : null}
          renderIcon={() => moreIconJsx}
          renderSelectedIcon={() => moreSelectedIconJsx}
        >
          {<MoreContainer />}
        </TabNavigator.Item>
      </TabNavigator>
    </View>
  );
};

const mapStateToProps = state => ({ tabs: state.tabs });

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

ApplicationTabs.propTypes = { tabs: tabProps };

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationTabs);
