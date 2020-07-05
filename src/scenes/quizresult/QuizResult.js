import React, {useState, useEffect, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import PrefersHomeIndicatorAutoHidden from 'react-native-home-indicator';
import Orientation from 'react-native-orientation-locker';
import {Icon} from 'react-native-elements';

const QuizResult = ({route, navigation}) => {
  const {result} = route.params;
  const handleClick = (param) => {
    if (param == 'result') {
      navigation.navigate('Your Score', {result: result});
    }
    if (param == 'new') {
      navigation.navigate('Member Area');
    }
    if (param == 'repeat') {
        navigation.navigate('SelectLevel');
      }
  };
  useFocusEffect(
    React.useCallback(() => {
      Orientation.lockToLandscape();
    }, []),
  );

  return (
    <View style={styles.container}>
      <PrefersHomeIndicatorAutoHidden />
      <View style={styles.textGroup}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/icon3.png')}
        />
        <Text style={styles.textStyle}>Good Work!</Text>
        <Text style={styles.textStyle}>
          Pitch Recognition Training Complete!
        </Text>
      </View>
      <View style={styles.ButtonGroup}>
        <TouchableOpacity
          style={styles.ButtonStyle}
          onPress={() => handleClick('result')}>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 14,
              fontWeight: '900',
            }}>
            Pitch-By-Pitch Breakdown
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ButtonStyle}
          onPress={() => handleClick('repeat')}>
          <Icon
            name="repeat"
            type="font-awesome"
            color="#ffffff"
            size={20}></Icon>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 14,
              fontWeight: '900',
            }}>
            {'Repeat Pitch Sequence'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ButtonStyle}
          onPress={() => handleClick('new')}>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 14,
              fontWeight: '900',
            }}>
            {'Choose New Drill'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textGroup: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 17,
  },
  ButtonStyle: {
    backgroundColor: '#1e73be',
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  ButtonGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default QuizResult;
