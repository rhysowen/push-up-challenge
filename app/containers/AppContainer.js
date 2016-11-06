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

import NavigationHeaderComponent from '../components/container/NavigationHeaderComponent';
import AdvertBanner from '../components/shared/AdvertBanner';

import {
  BASE_FONT_FAMILY_IOS,
  BASE_BACKGROUND_COLOR,
  TAB_COLOR,
} from '../theme/style';
import {
  NOT_SET,
  PRO_ENABLED,
} from '../lib/constants';
import { SMART_BANNER_HEIGHT } from '../lib/ads';

const {
  Card: NavigationCard,
  Transitioner: NavigationTransitioner,
  Header: NavigationHeader,
} = NavigationExperimental;

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  navHeader: { backgroundColor: TAB_COLOR },
  navTitle: {
    color: 'white',
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
});

const getCardWrapperStyle = (proModeActive) => {
  let marginTop = NavigationHeader.HEIGHT;

  if (!proModeActive) {
    marginTop += SMART_BANNER_HEIGHT;
  }

  return {
    backgroundColor: BASE_BACKGROUND_COLOR,
    marginTop,
  };
};

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

const LEFT_COMPONENT = 'LEFT_COMPONENT';
const CHEVRON_LEFT = 'chevron-left';

const getScreenName = (props) => {
  const { navigationState } = props;

  return navigationState.routes[navigationState.index].key;
};

const renderComponent = (mode, props) => {
  const { navigationState } = props;

  // Is there a screen stacked?
  const isStacked = navigationState.index > 0;

  let icon;
  let callback;

  if (isStacked) {
    icon = CHEVRON_LEFT;
    callback = () => props.navigatePop();
  }

  if (typeof icon !== 'undefined') {
    return (
      <NavigationHeaderComponent
        {...props}
        isLeft={mode === LEFT_COMPONENT}
        callback={callback}
        icon={icon}
      />
    );
  }

  return (
    <View />
  );
};

const renderLeftComponent = props => renderComponent(LEFT_COMPONENT, props);

const AppContainer = (props) => {
  const {
    navigationState,
    util,
  } = props;

  const isProEnabled = util.proMode === PRO_ENABLED;
  const cardWrapper = getCardWrapperStyle(isProEnabled);
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
        render={renderProps => (
          <View style={styles.wrapper}>
            <NavigationCard
              {...renderProps}
              onNavigateBack={() => props.navigatePop()}
              key={renderProps.scene.route.key}
              renderScene={() => (<SceneContainer {...renderProps} {...props} />)}
              style={cardWrapper}
            />
            <NavigationHeader
              {...renderProps}
              onNavigateBack={() => props.navigatePop()}
              style={styles.navHeader}
              renderLeftComponent={() => renderLeftComponent(props)}
              renderTitleComponent={() => (
                <NavigationHeader.Title>
                  <Text
                    style={styles.navTitle}
                  >
                    {title}
                  </Text>
                </NavigationHeader.Title>
              )}
            />
            <AdvertBanner
              hideBanner={isProEnabled}
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
  util: state.more.util,
});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
