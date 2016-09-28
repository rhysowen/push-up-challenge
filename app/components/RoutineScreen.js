import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
} from 'react-native';

export default class RoutineScreen extends Component {

  componentDidMount() {
    this.props.getProgram();
  }

  renderRoutineScreen() {
    let ret;

    const { program } = this.props;

    if (program === undefined) {
      // No program has been selected.
      ret = (<Text>Please select a program - none selected!</Text>);
    } else {
      // A program has been selected.
      ret = (<Text>You have selected program {program.exercise.name}</Text>);
    }

    return ret;
  }

  render() {
    return (
      <ScrollView style={{ marginTop: 90 }}>
        {this.renderRoutineScreen()}
      </ScrollView>
    );
  }
}

