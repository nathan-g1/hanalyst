import React, {Component} from 'react';
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {Button} from 'react-native';
import styles from '../design/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
export default class Login extends Component {
  render(h) {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>Hosanna Analyst</Text>
              <Input
                placeholder='INPUT WITH ICON'
                leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
              />

              <Input
                placeholder='INPUT WITH CUSTOM ICON'
                leftIcon={
                  <Icon
                    name='user'
                    size={24}
                    color='black'
                  />
                }
              />

              <Input
                placeholder='INPUT WITH ERROR MESSAGE'
                errorStyle={{ color: 'red' }}
                errorMessage='ENTER A VALID ERROR HERE'
              />
              <TextInput
                placeholder="Username"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
              />
              <TextInput
                placeholder="Password"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                secureTextEntry={true}
              />
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.onLoginPress()}
                title="Login"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
  componentDidMount() {}

  componentWillUnmount() {}

  onLoginPress() {}

  async onFbLoginPress() {
    Alert.alert('welcome in! name}!');
  }
}
