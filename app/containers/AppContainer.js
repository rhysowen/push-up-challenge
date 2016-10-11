import React from 'react';
import {
  StyleSheet,
  View,
  NavigationExperimental,
  Image,
  StatusBar,
} from 'react-native';

// Takes in state & actions - will wrap any component we give it.
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';

import SceneContainer from './SceneContainer';
import {
  TAB_COLOR,
  BASE_BACKGROUND_COLOR,
} from '../theme/style';

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
  navLogo: {
    width: 165,
    height: 20,
  },
  cardWrapper: {
    backgroundColor: 'white',
    marginTop: NavigationHeader.HEIGHT,
  },
});

const AppLogo = require('../theme/images/PushUpsLogo.png');

const AppContainer = (props) => {
  const { navigationState } = props;

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
                  <Image
                    source={AppLogo}
                    style={styles.navLogo}
                  />
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
});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
