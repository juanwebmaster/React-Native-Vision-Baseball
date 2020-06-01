import React from 'react';
import {View, Text} from 'react-native';
const SelectLevel = ({route, navigation}) => {
  const {post_id} = route.params;

  return <Text>{post_id}</Text>;
};
export default SelectLevel;
