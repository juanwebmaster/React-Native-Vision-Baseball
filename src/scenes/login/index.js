//import liraries
import React, {useEffect, Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import LoginForm from './LoginForm';
import SplashScreen from 'react-native-splash-screen';
// create a component
const LoginScreen = ({navigation}) => {
  setInterval(() => {
    SplashScreen.hide();
  }, 5000);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.loginContainer}>
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={require('../../assets/images/logo1.png')}
        />
      </View>
      <View style={styles.formContainer}>
        <LoginForm navigation={navigation} />
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
