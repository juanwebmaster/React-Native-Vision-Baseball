import React from 'react';
import {View, Image, StyleSheet} from 'react-native'
const HeaderIcon = () => (
  <View style={styles.logoContainer}>
    <Image
      
      style={styles.logo}
      source={require('../../assets/images/header.png')}
    />
  </View>
);

const styles = StyleSheet.create({
  logo: {
    flex:1,
    resizeMode:"stretch",
    height:100,
    width:170,
    
  },
  logoContainer: {
    flex:1,
    height:100,
  },
});

export default HeaderIcon;