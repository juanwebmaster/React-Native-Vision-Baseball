//import liraries
import React, {useEffect, Component} from 'react';
import PrefersHomeIndicatorAutoHidden from 'react-native-home-indicator';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import LoginForm from './LoginForm';
// create a component
const LoginScreen = ({setLoggedIn}) => {
  

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <PrefersHomeIndicatorAutoHidden />
      <View style={styles.loginContainer}>
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={require('../../assets/images/logo1.png')}
        />
      </View>
      <View style={styles.formContainer}>
        <LoginForm setLoggedIn={setLoggedIn} />
      </View>
    </KeyboardAvoidingView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  loginContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  formContainer: {
    flex:1
  },
  logo: {
    position: 'absolute',
    width: 400,
    height: 300,
  },
  title: {
    color: '#FFF',
    marginTop: 120,
    width: 180,
    textAlign: 'center',
    opacity: 0.9,
  },
});

//make this component available to the app
export default LoginScreen;
