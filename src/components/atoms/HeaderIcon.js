import React from 'react';
import {View, Image, StyleSheet} from 'react-native'
const HeaderIcon = () => (
  <View style={styles.logoContainer}>
    <Image
      resizeMode="center"
      style={styles.logo}
      source={require('../../assets/images/header.png')}
    />
  </View>
);

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 80,
    marginLeft: 20,
  },
  logoContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});

export default HeaderIcon;