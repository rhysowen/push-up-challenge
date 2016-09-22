import React, {
  PropTypes,
} from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import TabNavigator from 'react-native-tab-navigator';

// Screens
import RoutineScreen from '../components/RoutineScreen';
import MoreScreen from '../components/MoreScreen';
import StatisticScreen from '../components/StatisticScreen';

// Screen containers
import ProgramContainer from './ProgramContainer';

const propTypes = {
  setTab: PropTypes.func,
  tabs: PropTypes.object,
  index: PropTypes.number,
};

const ApplicationTabs = props => (
  <View style={{ flex: 1 }}>
    <TabNavigator>
      <TabNavigator.Item
        selected={props.tabs.index === 0}
        title="Routine"
        onPress={() => props.setTab(0)}
      >
        {<RoutineScreen {...props} />}
      </TabNavigator.Item>
      <TabNavigator.Item
        selected={props.tabs.index === 1}
        title="Programs"
        onPress={() => props.setTab(1)}
      >
        {<ProgramContainer />}
      </TabNavigator.Item>
      <TabNavigator.Item
        selected={props.tabs.index === 2}
        title="Statistics"
        onPress={() => props.setTab(2)}
      >
        {<StatisticScreen {...props} />}
      </TabNavigator.Item>
      <TabNavigator.Item
        selected={props.tabs.index === 3}
        title="More"
        onPress={() => props.setTab(3)}
      >
        {<MoreScreen {...props} />}
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

export default connect(mapStateToProps)(ApplicationTabs);
