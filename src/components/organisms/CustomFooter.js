import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native'
const CustomFooter = () => {
  return (
    <View style={styles.CustomFooterStyle}>
      <Image
        resizeMode="center"
        style={styles.FooterLogoStyle}
        source={require('../../assets/images/logo2.png')}
      />
      <Text style={{textAlign: 'center', fontSize: 12, lineHeight: 30}}>
        2010-2020 Art of Baseball DBA Applied Vision Baseball. All Rights
        Reserved. SiteMap. Privacy Policy
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  CustomFooterStyle: {
    backgroundColor: '#3e8ae6',
    marginTop: 50,
    paddingTop: 40,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 50,
    width: '100%',
    flex: 1,
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'baseline',
    
  },

  FooterLogoStyle: {
    width: 200,
    height: 120,
    paddingTop: 50,
    paddingBottom: 50,

    resizeMode: 'stretch',
  },
});

export default CustomFooter;
