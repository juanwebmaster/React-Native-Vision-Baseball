import React, {useState, useEffect, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import PrefersHomeIndicatorAutoHidden from 'react-native-home-indicator';
import Orientation from 'react-native-orientation-locker';
import {Icon} from 'react-native-elements';

const ResultView = ({route, navigation}) => {
  const {result} = route.params;
  const paramResult = JSON.parse(result);

  const your_answers = Object.values(paramResult.your_answer);
  const correct_answers = Object.values(paramResult.correct_answer);
  const correctness = Object.values(paramResult.correctness);
  console.log(your_answers);

  let result_answer = [];

  let correct_count = 0;

  for (i = 0; i < your_answers.length; i++) {
    let temp = {};
    temp.your_answer = your_answers[i];
    temp.correctness = correctness[i];
    result_answer.push(temp);
    if (correctness[i] == true) correct_count++;
  }

  const handleClick = (param) => {};
  useFocusEffect(
    React.useCallback(() => {
      Orientation.lockToLandscape();
    }, []),
  );

  return (
    <View style={styles.container}>
      <PrefersHomeIndicatorAutoHidden />

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View style={{alignItems: 'center', paddingTop: 50}}>
            <Text>Your Answer</Text>
            {result_answer.map((item) => {
              return item.correctness ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 10,
                  }}>
                  <Icon
                    name="check"
                    type="font-awesome"
                    size={10}
                    color="green"
                    paddingRight={5}></Icon>
                  <Text style={{color: 'green', fontSize: 15}}>
                    {item.your_answer}
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 10,
                  }}>
                  <Icon
                    name="times"
                    type="font-awesome"
                    size={10}
                    color="red"
                    paddingRight={5}></Icon>
                  <Text style={{color: 'red', fontSize: 15}}>
                    {item.your_answer}
                  </Text>
                </View>
              );
            })}
          </View>
          <View
            style={{
              alignItems: 'center',
              paddingTop: 40,
              marginLeft: 30,
              marginRight: 30,
            }}>
            <View
              style={{
                backgroundColor: '#3e8ae6',
                justifyContent: 'center',
                alignItems: 'center',
                width: 50,
                height: 50,
                borderRadius: 50,
              }}>
              <Text>{correct_count + '/' + your_answers.length}</Text>
            </View>
          </View>
          <View style={{alignItems: 'center', paddingTop: 50}}>
            <Text>Correct Answer</Text>
            {correct_answers.map((item) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <Text style={{fontSize: 15}}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

      <TouchableOpacity
        style={styles.ButtonStyle}
        onPress={() => handleClick(navigation.goBack())}>
        <Text
          style={{
            color: '#ffffff',
            fontSize: 14,
            fontWeight: '900',
          }}>
          {'Close'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
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
});

export default ResultView;
