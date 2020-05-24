import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import {
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
const Drawer = createDrawerNavigator();
const Home = ({name}) => {
  return (
    <View style={styles.container}>

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
