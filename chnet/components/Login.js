import React, { memo, useState, Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from './custom/Background';
import Logo from './custom/Logo';
import Header from './custom/Header';
import Button from './custom/Button';
import TextInput from './custom/TextInput';
import BackButton from './custom/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import { Navigation } from 'react-native-navigation';

export default class LoginScreen extends Component {
  state = {
    email: {
      value: '',
      error: ''
    },
    password: {
      value: '',
      error: ''
    }
  }
  // const[email, setEmail] = useState({ value: '', error: '' });
  // const[password, setPassword] = useState({ value: '', error: '' });
  setEmail = (v) => {
    this.setState({ email: v });
  }
  setPassword = (v) => {
    this.setState({ password: v });
  }
  _onLoginPressed = () => {
    const { email, password } = this.state;
    const emailError = emailValidator(this.state.email.value);
    const passwordError = passwordValidator(this.state.password.value);

    if (emailError || passwordError) {
      this.setEmail({ ...email, error: emailError });
      this.setPassword({ ...password, error: passwordError });
      return;
    }

    // navigation.navigate('Dashboard');
    this.goToHomePage('gameRegistry');
  };

  goToHomePage = (screenName) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName
      }
    })
  }
  render() {
    return (
      <Background>
        {/* <BackButton goBack={() => navigation.navigate('HomeScreen')} /> */}

        < Logo />

        <Header>Hosanna Analyst</Header>

        <TextInput
          label="Email"
          returnKeyType="next"
          value={this.state.email.value}
          onChangeText={text => this.setEmail({ value: text, error: '' })}
          error={!!this.state.email.error}
          errorText={this.state.email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <TextInput
          label="Password"
          returnKeyType="done"
          value={this.state.password.value}
          onChangeText={text => this.setPassword({ value: text, error: '' })}
          error={!!this.state.password.error}
          errorText={this.state.password.error}
          secureTextEntry
        />

        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPasswordScreen')}
          >
            <Text style={styles.label}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <Button mode="contained" onPress={this._onLoginPressed}>
          Login
      </Button>

        <View style={styles.row}>
          <Text style={styles.label}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Background >
    );
  }
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

