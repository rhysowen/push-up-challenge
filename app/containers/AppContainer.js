import React from 'react';
import {
  StyleSheet,
  View,
  NavigationExperimental,
  StatusBar,
  Text,
} from 'react-native';

// Takes in state & actions - will wrap any component we give it.
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';

import SceneContainer from './SceneContainer';
import {
  TAB_COLOR,
  BASE_FONT_FAMILY_IOS,
} from '../theme/style';
import { NOT_SET } from '../lib/constants';

const {
  Card: NavigationCard,
  Transitioner: NavigationTransitioner,
  Header: NavigationHeader,
} = NavigationExperimental;

const { PagerStyleInterpolator: NavigationPagerStyleInterpolator } = NavigationCard;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  navHeader: {
    backgroundColor: TAB_COLOR,
  },
  navTitle: {
    color: 'white',
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
  cardWrapper: {
    backgroundColor: 'white',
    marginTop: NavigationHeader.HEIGHT,
  },
});

const renderTitle = (props) => {
  const {
    navigationState,
    tabs,
  } = props;

  const selectedTab = tabs.routes[tabs.index];
  const selectedScreen = navigationState.routes[navigationState.index];

  if (selectedScreen.title === NOT_SET) {
    return selectedTab.title;
  }

  return selectedScreen.title;
};

const AppContainer = (props) => {
  const { navigationState } = props;
  const title = renderTitle(props);

  return (
    <View
      style={styles.wrapper}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={TAB_COLOR}
      />
      <NavigationTransitioner
        navigationState={navigationState}
        style={styles.wrapper}
        onTransitionStart={() => console.log('hello')}
        render={renderProps => (
          <View style={styles.wrapper}>
            <NavigationCard
              {...renderProps}
              onNavigateBack={() => props.navigateBack()}
              key={renderProps.scene.route.key}
              renderScene={() => (<SceneContainer {...renderProps} {...props} />)}
              style={styles.cardWrapper}
            />
            <NavigationHeader
              {...renderProps}
              onNavigateBack={() => props.navigateBack()}
              style={styles.navHeader}
              renderTitleComponent={() => (
                <NavigationHeader.Title>
                  <Text
                    style={styles.navTitle}
                  >
                    {title}
                  </Text>
                </NavigationHeader.Title>
              )}
              // When dealing with modals you may also want to override renderLeftComponent...
            />
          </View>
        )}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  navigationState: state.navigationState,
  tabs: state.tabs,
});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
