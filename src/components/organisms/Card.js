import React from 'react';
import {View} from 'react-native';
const Card = (props) => (
  <View style={[styles.containerStyle, props.style]}>{props.children}</View>
);
const styles = {
  containerStyle: {
    borderRadius: 5,
    borderColor: '#ddd',
    marginTop: 10,
  },
};
export {Card};

