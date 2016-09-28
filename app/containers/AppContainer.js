import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  NavigationExperimental,
  Text,
} from 'react-native';

// Takes in state & actions - will wrap any component we give it.
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

import SceneContainer from './SceneContainer';

const {
  Card: NavigationCard,
  Transitioner: NavigationTransitioner,
  Header: NavigationHeader
} = NavigationExperimental;

const {
  PagerStyleInterpolator: NavigationPagerStyleInterpolator
} = NavigationCard;

const AppContainer = (props) => {
  const { navigationState } = props;

  return (
    <NavigationTransitioner
      navigationState={navigationState}
      style={{flex: 1}}
      render={renderProps => (
        <View style={{flex: 1}}>
          <NavigationCard
            {...renderProps}
            onNavigateBack={() => props.navigateBack()}
            key={renderProps.scene.route.key}
            renderScene={() => (<SceneContainer {...renderProps} {...props } />)}
          />
          <NavigationHeader
            {...renderProps}
            onNavigateBack={() => props.navigateBack()}
            renderTitleComponent={() => {
              const title = 'lol';
              return (<NavigationHeader.Title>{title}</NavigationHeader.Title>);
            }}
            // When dealing with modals you may also want to override renderLeftComponent...
          />
        </View>
      )}
    />
  );
};

function mapStateToProps(state) {
  return {
    navigationState: state.navigationState,
    recipeCounter: state.recipeCount,
    program: state.program,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
