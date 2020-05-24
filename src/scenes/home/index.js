import React from 'react';
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
const Home = ({name}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textView}>Hello, You are Logged in.           Go on!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',

  },
  textView: {
    
    fontSize:30,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#fff',
  },
  
});
export default Home;
