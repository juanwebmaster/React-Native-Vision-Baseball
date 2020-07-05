import React, {useState, useRef} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Video from 'react-native-video';
import {Icon} from 'react-native-elements';
import AnswerView from './AnswerView';
import { NavigationEvents } from 'react-navigation';
const BASE_IMAGE_URL = 'https://content.jwplatform.com/v2/media/';
const BASE_VIDEO_URL = 'https://content.jwplatform.com/manifests/';

export const postResult = async (data) => {
  const formData = new FormData();
  formData.append('action', 'statistic_data');
  formData.append('user_id', data.user_id);
  formData.append('question_id', data.question_id);
  formData.append('correct_ans', data.correct_answer);
  formData.append('user_answer', data.user_answered);
  formData.append('react_time', data.reaction_time);
  formData.append('pitch_type', data.pitch_type);
  formData.append('accuracy', data.accuracy);
  formData.append('date_time', data.date_time);
  const res = await axios.post(
    'https://appliedvisionbaseball.com/wp-admin/admin-ajax.php',
    formData,
    {
      headers: {'Content-Type': 'multipart/form-data'},
    },
  );
  return res.data;
};

const QuizView = ({data, navigation}) => {
  const [questionId, setQuestionId] = useState(0);
  console.disableYellowBox = true;
  const [imageUrl, setImageUrl] = useState(
    BASE_IMAGE_URL + data.question_ids[questionId].url + '/poster.jpg',
  );
  const [videoUrl, setVideoUrl] = useState(
    BASE_VIDEO_URL + data.question_ids[questionId].url + '.m3u8',
  );
  const [answers, setAnswers] = useState(data.question_ids[questionId].answers);
  const [isPlaying, setIsPlaying] = useState('');
  const [selAnswer, setSelAnswer] = useState('');
  const [thumbs, setThumbs] = useState('');
  const [isPaused, setIsPaused] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);

  const player = useRef(null);
  const [visible, setVisible] = useState(true);
  const [changeStyle, setChangeStyle] = useState(false);
  const qIDs = data.question_ids.map((item) => item.id);

  const prefix = 'question_id_';
  let options = {
    correctness: {},
    user_answered: {},
    your_answer: {},
    correct_answer: {},
  };
  //  console.log(data.question_ids[0].id);
  const getCorrectAnswer = (answers) => {
    let correctAnswer = '';
    answers.map((item) => {
      if (item.answer1.correct == 1)
        correctAnswer = item.label + '-' + item.answer1.answer;
      if (item.answer2.correct == 1)
        correctAnswer = item.label + '-' + item.answer2.answer;
      //console.log("items=====>", item);
    });
    return correctAnswer;
  };
  let statisticResult = '';
  handleTimeElapsed = () => {
    if (selAnswer === '') {
      options['user_answered'][prefix + data.question_ids[questionId].id] = '';
      options['correct_answer'][
        prefix + data.question_ids[questionId].id
      ] = getCorrectAnswer(data.question_ids[questionId]['answers']);

      options['correctness'][prefix + data.question_ids[questionId].id] = false;
      AsyncStorage.getItem('user', async (err, result) => {
        userInfo = JSON.parse(result);
        statisticResult = {
          question_id: data.question_ids[questionId].id,
          user_id: userInfo.id,
          correct_answer: data.question_ids[questionId].correct_answer,
          user_answered: '',
          reaction_time: 3,
          pitch_type: data.question_ids[questionId].pitch_type,
          accuracy: 0,
          date_time: null,
        };
        //const post_res = await postResult(statisticResult);
        console.log('result=>', statisticResult);
      });
      Alert.alert('Out of Time', '', [
        {
          text: 'OK',
          onPress: async () => {
            setVisible(true);
            setShowAnswer(false);
            setThumbs('');
            setSelAnswer('');

            if (data.question_ids[questionId + 1]) {
              setQuestionId(questionId + 1);
              setImageUrl(
                BASE_IMAGE_URL +
                  data.question_ids[questionId].url +
                  '/poster.jpg',
              );
              setVideoUrl(
                BASE_VIDEO_URL + data.question_ids[questionId].url + '.m3u8',
              );
            } else {
            }

            if (data.question_ids[questionId]) {
              setIsPlaying(true);
              setAnswers(data.question_ids[questionId].answers);
            }

            setChangeStyle(false);
          },
        },
      ]);
    }
  };
  const onIdle = () => {
    setIsPlaying(false);
    setIsPaused(true);
    setShowAnswer(true);
  };
  let userInfo = {};
  let startDate = (endDate = '');
  const handleAnswer = (sel, id, pitchType, title) => {
    options['correct_answer'][
      prefix + data.question_ids[questionId].id
    ] = getCorrectAnswer(data.question_ids[questionId]['answers']);
    options['your_answer'][
      prefix + data.question_ids[questionId].id
    ] = pitchType + '-' + title;
    if (id > 0) {
      setSelAnswer(sel);
      AsyncStorage.getItem('user', async (err, result) => {
        userInfo = JSON.parse(result);
        statisticResult = {
          question_id: data.question_ids[questionId].id,
          user_id: userInfo.id,
          correct_answer: data.question_ids[questionId].correct_answer,
          user_answered: id,
          reaction_time: 1,
          pitch_type: data.question_ids[questionId].pitch_type,
          accuracy: sel,
          date_time: null,
        };
        //const post_res = await postResult(statisticResult);
        console.log('result=>', statisticResult);
        console.log('userInfo===============>', userInfo);

        AsyncStorage.mergeItem('answersStore', JSON.stringify(options), () => {
          AsyncStorage.getItem('answersStore', (err, result) => {
            console.log(result);
            if (questionId == 0)
              AsyncStorage.mergeItem(
                'resultStore',
                JSON.stringify({start_date: startDate}),
              );
            if (questionId + 1 == data.question_ids.length) {
              navigation.navigate('QuizResult', {result:result})
            }

            //console.log('Merged =======> ', result);
          });
        });
      });

      options['user_answered'][prefix + data.question_ids[questionId].id] = id;
      if (sel == 1) {
        setThumbs('correct');
        options['correctness'][
          prefix + data.question_ids[questionId].id
        ] = true;
      } else {
        setThumbs('incorrect');
        options['correctness'][
          prefix + data.question_ids[questionId].id
        ] = false;
      }
    }
    setChangeStyle(true);
    setTimeout(() => {
      setVisible(true);
      setShowAnswer(false);
      setThumbs('');
      setSelAnswer('');

      if (data.question_ids[questionId + 1]) {
        setQuestionId(questionId + 1);
        setImageUrl(
          BASE_IMAGE_URL + data.question_ids[questionId].url + '/poster.jpg',
        );
        setVideoUrl(
          BASE_VIDEO_URL + data.question_ids[questionId].url + '.m3u8',
        );
      } else {
      }

      if (data.question_ids[questionId]) {
        setIsPlaying(true);
        setAnswers(data.question_ids[questionId].answers);
      }

      setChangeStyle(false);
    }, 1000);
  };

  const playVideo = () => {
    setIsPaused(false);
    player.current.seek(0);
    setVisible(false);
  };

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View
        style={{
          flex: 1,
          width: '50%',
          height: '100%',
          justifyContent: 'center',
        }}>
        {visible && (
          <TouchableOpacity
            onPress={playVideo}
            style={{
              position: 'absolute',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(33,33,33,0.5)',
              zIndex: 300,
            }}>
            <Icon
              name="play"
              type="font-awesome"
              color="#ffffff"
              size={100}></Icon>
          </TouchableOpacity>
        )}
        {showAnswer == true && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,1)',
              zIndex: 300,
            }}>
            {thumbs === 'incorrect' && (
              <View
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  name="thumbs-down"
                  type="font-awesome"
                  color="rgba(109,216,101,1)"
                  size={200}></Icon>
                <Text
                  style={{
                    position: 'absolute',
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    fontSize: 30,
                    fontStyle: 'italic',
                    fontWeight: '900',
                    color: '#ffffff',
                  }}>
                  INCORRECT
                </Text>
              </View>
            )}
            {thumbs === 'correct' && (
              <View
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  name="thumbs-up"
                  type="font-awesome"
                  color="rgba(255,89,85,1)"
                  size={200}></Icon>
                <Text
                  style={{
                    paddingTop: 50,
                    position: 'absolute',
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    fontSize: 30,
                    fontStyle: 'italic',
                    fontWeight: '900',
                    color: '#ffffff',
                  }}>
                  CORRECT
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        <Video
          ref={player}
          style={styles.player}
          source={{uri: videoUrl}}
          paused={isPaused}
          onEnd={onIdle}
          resizeMode="cover"
        />
      </View>
      <View style={{flex: 1, width: '50%', backgroundColor: '#333333'}}>
        {(isPlaying == true || isPlaying === '') && (
          <View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(33,33,33,0.8)',
              zIndex: 300,
            }}></View>
        )}
        <AnswerView
          answers={answers}
          questionId={questionId}
          countQuestions={data.question_ids.length}
          isPlaying={isPlaying}
          handleAnswer={handleAnswer}
          changeStyle={changeStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  player: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 200,
  },
});

export default QuizView;
