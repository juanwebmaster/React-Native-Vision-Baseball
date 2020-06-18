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

import Video from 'react-native-video';
import {Icon} from 'react-native-elements';
import AnswerView from './AnswerView';
const BASE_IMAGE_URL = 'https://content.jwplatform.com/v2/media/';
const BASE_VIDEO_URL = 'https://content.jwplatform.com/manifests/';
const QuizView = ({data}) => {
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
  const qIDs = data.question_ids.map(item => item.id);
  
  const prefix = 'question_id_';
  let options = {
    correctness: {

    },
    user_answered: {

    },
    question_ids: qIDs,
    passed_time: "1 minute",
    calc_method: "by_correctness",
    attributes_information: [],
  };
  console.log(data.question_ids[0].id);
  handleTimeElapsed = () => {
    if (selAnswer === '') {
      options['user_answered'][prefix + data.question_ids[questionId].id] = '';
      options['correctness'][prefix + data.question_ids[questionId].id] = false;
      AsyncStorage.mergeItem('answersStore', JSON.stringify(options), () => {
        AsyncStorage.getItem('answersStore', (err, result) => {
          console.log('Merged =======> ', result);
        })
      })
      Alert.alert('Out of Time', '', [
        {
          text: 'OK',
          onPress: async () => {
            setVisible(true);

            if (data.question_ids[questionId]) {
              setIsPlaying(true);

              setAnswers(data.question_ids[questionId].answers);
              setShowAnswer(false);
            }
          },
        },
      ]);
    }
  };
  const onIdle = () => {
    console.log('onIdle=========>questionId', questionId);
    setIsPlaying(false);
    setIsPaused(true);
    setShowAnswer(true);
    
    
  };
  const handleAnswer = (sel, id) => {
    setSelAnswer(sel);
    console.log("handleAnswer===========>",questionId);
    options['user_answered'][prefix + data.question_ids[questionId].id] = id;
    if (sel == 1) {
      setThumbs('correct');
      options['correctness'][prefix + data.question_ids[questionId].id] = true;
    } else {
      setThumbs('incorrect');
      options['correctness'][prefix + data.question_ids[questionId].id] = false;
    } 

    AsyncStorage.mergeItem('answersStore', JSON.stringify(options), () => {
      AsyncStorage.getItem('answersStore', (err, result) => {
        console.log('Merged =======> ', result);
      })
    })
    setChangeStyle(true);
    setTimeout(() => {
      setVisible(true);
      setShowAnswer(false);
      setThumbs('');
      setSelAnswer('');

      console.log("IDSS=========>",data.question_ids.length, questionId);
      if (data.question_ids[questionId + 1]) {
        setQuestionId(questionId + 1);
        setImageUrl(
          BASE_IMAGE_URL + data.question_ids[questionId].url + '/poster.jpg',
        );
        setVideoUrl(BASE_VIDEO_URL + data.question_ids[questionId].url + '.m3u8');
      }else {
        console.log("Finished");
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
          resizeMode="stretch"
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
