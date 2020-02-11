import React, { Component } from 'react';
import HeaderNew from './components/HeaderNew';
import Login from './components/Login';
import Report from './components/Report';
import AnalysisAttack from './components/AnalysisAttack';
import AnalysisDefence from './components/AnalysisDefence';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
// import {} from 'react-navigation';
const theme = {
  Button: {
    raised: true,
    titleStyle: {
      color: 'lightblue',
    },
  },
};
export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        {/* <HeaderNew />
        <Button title="again" /> */}
        {/* <Report /> */}
        <Login />
        {/* <AnalysisAttack />
        <AnalysisDefence /> */}
      </ThemeProvider>
    );
  }
}
// export default App;
// import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
