//import liraries
import React, {useEffect, useState, Component} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  StyleSheet,
  StatusBar,
} from 'react-native';

const getPosts = async(email, password) => {
  const formData = new FormData();
  formData.append('action', 'authenticate_user');
  formData.append('email', email);
  formData.append('password', password);
  const res = await axios.post('http://localhost:8888/vision-baseball/wp-admin/admin-ajax.php', formData,{
    headers: {'Content-Type': 'multipart/form-data'}
  })
  if (res.data.ID > 0) return true; else return false;
};

const LoginForm = ({setLoggedIn}) => {
  const [email, setEamil] = useState('');
  const [password, setPassword] = useState('');
  const onButtonPress = async() => {
    if (email !== '' && password !== '') {
      if (email == 'guest' && password == 'Marius4Spata!!') {
        const result = await getPosts(email, password);
        console.log(true);
        setLoggedIn(true);
      }
    }
  };

  const changeEmail = (TextInputValue) => {
    setEamil(TextInputValue);
  };

  const changePassword = (TextInputValue) => {
    setPassword(TextInputValue);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        onSubmitEditing={() => this.passwordInput.focus()}
        onChangeText={(TextInputValue) => changeEmail(TextInputValue)}
        autoCorrect={false}
        keyboardType="email-address"
        returnKeyType="next"
        placeholder="Email or Mobile Num"
        placeholderTextColor="rgba(225,225,225,0.7)"
      />

      <TextInput
        style={styles.input}
        returnKeyType="go"
        ref={(input) => (this.passwordInput = input)}
        onChangeText={(TextInputValue) => changePassword(TextInputValue)}
        placeholder="Password"
        placeholderTextColor="rgba(225,225,225,0.7)"
        secureTextEntry
      />
      {/*   <Button onPress={onButtonPress} title = 'Login' style={styles.loginButton} /> */}
      <TouchableOpacity style={styles.buttonContainer} onPress={onButtonPress}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#fff',
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  loginButton: {
    backgroundColor: '#2980b6',
    color: '#fff',
  },
});

//make this component available to the app
export default LoginForm;
