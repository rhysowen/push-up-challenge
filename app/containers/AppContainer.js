import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  NavigationExperimental,
  StatusBar,
  Dimensions,
  Text,
  BackAndroid,
  Platform,
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
import { NOT_SET } from '../lib/constants';
import { isProEnabled } from '../lib/util';
import {
  combinedUtilProps,
  navigationProps,
} from '../lib/commonProps';

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

const getAdBanner = () => {
  const { width } = Dimensions.get('window');

  if (width >= 728) {
    return {
      ad: 'leaderboard',
      height: 90,
      width: 728,
    };
  } else if (width >= 468) {
    return {
      ad: 'fullBanner',
      height: 60,
      width: 468,
    };
  }

  return {
    ad: 'banner',
    height: 50,
    width: 320,
  };
};

const getCardWrapperStyle = (proEnabled, adBannerHeight) => {
  let marginTop = NavigationHeader.HEIGHT;

  if (!proEnabled) {
    marginTop += adBannerHeight;
  }

  return {
    backgroundColor: BASE_BACKGROUND_COLOR,
    marginTop,
  };
};

const renderTitle = (props) => {
  const {
    navigation,
    tabs,
  } = props;

  const selectedTab = tabs.routes[tabs.index];
  const selectedScreen = navigation.routes[navigation.index];

  if (selectedScreen.title === NOT_SET) {
    return selectedTab.title;
  }

  return selectedScreen.title;
};

const LEFT_COMPONENT = 'LEFT_COMPONENT';
const CHEVRON_LEFT = 'chevron-left';

const renderComponent = (mode, props) => {
  const { navigation } = props;

  // Is there a screen stacked?
  const isStacked = navigation.index > 0;

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

const onBackPress = (props) => {
  const {
    navigation,
    navigatePop,
  } = props;

  const navigationIndex = navigation.index;
  const isGoBack = navigationIndex > 0;

  navigatePop();

  return isGoBack;
};

class AppContainer extends Component {

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', () => onBackPress(this.props));
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', () => onBackPress(this.props));
    }
  }

  render() {
    const {
      navigation,
      util,
    } = this.props;

    const adBanner = getAdBanner();

    const proEnabled = isProEnabled(util.proMode);
    const cardWrapper = getCardWrapperStyle(proEnabled, adBanner.height);
    const title = renderTitle(this.props);

    return (
      <View
        style={styles.wrapper}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor={TAB_COLOR}
        />
        <NavigationTransitioner
          navigationState={navigation}
          style={styles.wrapper}
          render={renderProps => (
            <View style={styles.wrapper}>
              <NavigationCard
                {...renderProps}
                panHandlers={null}
                onNavigateBack={() => this.props.navigatePop()}
                key={renderProps.scene.route.key}
                renderScene={() => (
                  <SceneContainer
                    {...renderProps}
                    {...this.props}
                  />
                )}
                style={cardWrapper}
              />
              <NavigationHeader
                {...renderProps}
                onNavigateBack={() => this.props.navigatePop()}
                style={styles.navHeader}
                renderLeftComponent={() => renderLeftComponent(this.props)}
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
                //hideBanner={proEnabled}
                hideBanner={true}
                bannerSize={adBanner.ad}
                bannerHeight={adBanner.height}
                bannerWidth={adBanner.width}
              />
            </View>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation,
  tabs: state.tabs,
  util: state.util,
});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

AppContainer.propTypes = {
  util: combinedUtilProps,
  navigation: navigationProps,
  navigatePop: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
