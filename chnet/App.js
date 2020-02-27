import React, { Component } from 'react';
import HeaderNew from './components/HeaderNew';
import Login from './components/Login';
import Report from './components/Report';
import AnalysisAttack from './components/AnalysisAttack';
import AnalysisDefence from './components/AnalysisDefence';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import GameRegistry from './components/GameRegistry';

const theme = {
  Button: {
    raised: true,
    titleStyle: {
      color: 'lightblue',
    },
  },
};
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false
    }
  }

  goToScreen = (screenName) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName
      }
    }
    )
    // this.setState({display: true});
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        {/* <Button title="again" /> */}
        {/* <HeaderNew />
        // {/* <Report /> */}
        {/* <Login /> */}
        <AnalysisAttack /> 
        <AnalysisDefence />
        {/* <GameRegistry /> */}
        {/* <Login displayAnalysisPage={this.displayAnalysisPage} /> */}
      </ThemeProvider>
    );
  }
}
