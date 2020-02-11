import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Button, ThemeProvider} from 'react-native-elements';
const RaisedButton = props => <Button raised {...props} />;

const styles = {
  forLabel: {
    fontSize: 12,
  },
  forView: {
    flexDirection: 'column',
    height: 100,
    padding: 20,
  },
  forHeader: {
    backgroundcolor: 'red',
    color: 'white',
  },
};

export default class HeaderNew extends Component {
  render(props) {
    return (
      <ThemeProvider>
        <RaisedButton title="Hey!" />
        <Button title="again" />
      </ThemeProvider>
    );
  }
}
