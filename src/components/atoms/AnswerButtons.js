import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

export const AnswerButton = ({
  title,
  handleAnswer,
  correct,
  changeStyle,
  buttonType,
  id,
}) => {
  return (
    <TouchableOpacity
      style={
        changeStyle
          ? correct == 1
            ? styles.correctButtonStyle
            : buttonType == 'red'
            ? styles.YesButtonStyle
            : styles.NoButtonStyle
          : buttonType == 'red'
          ? styles.YesButtonStyle
          : styles.NoButtonStyle
      }
      onPress={() => handleAnswer(correct, id)}>
      <Text
        style={{
          color: '#ffffff',
          fontSize: 17,
          paddingLeft: 20,
          paddingRight: 20,
          fontWeight: '900',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  correctButtonStyle: {
    backgroundColor: 'rgba(255, 166, 40, 0.8)',
    flex: 1,
    margin: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#7ed957',
    shadowColor: '#ffffff',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
    shadowOpacity: 0.6,
  },
  wrongButtonStyle: {
    backgroundColor: 'rgba(0,0,0,1)',
  },
  NoButtonStyle: {
    backgroundColor: '#ff5757',
    flex: 1,
    margin: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  YesButtonStyle: {
    backgroundColor: '#7ed957',
    flex: 1,
    margin: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});
