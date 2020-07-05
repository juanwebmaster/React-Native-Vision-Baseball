import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import CountdownCircle from 'react-native-countdown-circle';
import {AnswerButton} from '../atoms/AnswerButtons';
const Answer = ({answer, changeStyle, handleAnswer}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={{color: '#ffffff', fontWeight: '400', fontSize: 20}}>
        {answer.label}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <AnswerButton
          title={answer.answer1.answer}
          correct={answer.answer1.correct}
          changeStyle={changeStyle}
          handleAnswer={handleAnswer}
          buttonType={'red'}
          id={answer.answer1.id}
          pitchType={answer.label}
        />
        <AnswerButton
          title={answer.answer2.answer}
          correct={answer.answer2.correct}
          changeStyle={changeStyle}
          handleAnswer={handleAnswer}
          buttonType={'blue'}
          id={answer.answer2.id}
          pitchType={answer.label}
        />
      </View>
    </View>
  );
};
const AnswerView = ({
  answers,
  questionId,
  countQuestions,
  isPlaying,
  handleAnswer,
  changeStyle,
}) => {
  return (
    <View style={{marginRight: 50, flex: 1, alignItems: 'center'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: 400,
          justifyContent: 'space-between',
          paddingLeft: 20,
        }}>
        <View>
          <Text style={{color: '#ffffff', fontSize: 20}}>
            {(questionId + 1) + '/' + countQuestions}
          </Text>
          <Text style={{color: '#ffffff', fontSize: 17}}>Pitch Count</Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#1E73BE',
            margin: 10,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
          }}>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 17,
              paddingLeft: 20,
              paddingRight: 20,
              fontWeight: '900',
            }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
      {answers.map((item, index) => (
        <Answer
          answer={item}
          key={index}
          handleAnswer={handleAnswer}
          changeStyle={changeStyle}
        />
      ))}

      <Text style={{color: '#ffffff', fontWeight: '700', fontSize: 17}}>
        TIMER
      </Text>
      {isPlaying === false && (
        <CountdownCircle
          seconds={3}
          radius={30}
          borderWidth={8}
          color="#ff003f"
          bgColor="#fff"
          textStyle={{fontSize: 20}}
          onTimeElapsed={handleTimeElapsed}
        />
      )}
    </View>
  );
};

export default AnswerView;
