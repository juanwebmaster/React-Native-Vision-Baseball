import React, {useState, useEffect, useRef} from 'react';
import CountdownCircle from 'react-native-countdown-circle';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import JWPlayer from 'react-native-jw-media-player';
import Video from 'react-native-video';
import {Overlay} from 'react-native-elements';

const BASE_IMAGE_URL = 'https://content.jwplatform.com/v2/media/';
const BASE_VIDEO_URL = 'https://content.jwplatform.com/manifests/';
//let questionId = 0;
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
  const [isPaused, setIsPaused] = useState(true);
  const player = useRef(null);
  const [visible, setVisible] = useState(true);
  const handlePressVideo = () => {
    // console.log(player.current.play());
  };
  const playlistItem = {
    title: '',
    mediaId: '1',
    image: imageUrl,
    desc: '',
    time: 1,
    file: videoUrl,
    //    file: 'http://file.com/file.mp3',
    autostart: false,
    controls: false,
    repeat: false,
    displayDescription: true,
    displayTitle: true,
  };

  const playList = data.question_ids.map((item, id) => {
    return {
      title: '',
      mediaId: id,
      image: imageUrl,
      desc: '',
      time: 1,
      file: videoUrl,
      //    file: 'http://file.com/file.mp3',
      autostart: false,
      controls: false,
      repeat: false,
      displayDescription: true,
      displayTitle: true,
    };
  });

  handleTimeElapsed = () => {
      if (selAnswer === '') {
        Alert.alert('Time out', 'Message', [
          {
            text: 'OK',
            onPress: async () => {
              setVisible(true);

              if (data.question_ids[questionId]) {
                setIsPlaying(true);

                setAnswers(data.question_ids[questionId].answers);
              }
            },
          },
        ]);
      }
  }
  const onIdle = () => {
    setIsPlaying(false);
    setIsPaused(true);
    if (data.question_ids.length > questionId) {
      setQuestionId(questionId + 1);
      setImageUrl(
        BASE_IMAGE_URL + data.question_ids[questionId].url + '/poster.jpg',
      );
      setVideoUrl(BASE_VIDEO_URL + data.question_ids[questionId].url + '.m3u8');
    }
  }

  const onBeforePlay = () => {};
  const handleAnswer = (sel) => {
    setSelAnswer(sel);
    console.log("selectedanswer=>==========>",sel);
    if (sel != '') {
      Alert.alert('Correct', 'Message', [
        {
          text: 'OK',
          onPress: async () => {
            setVisible(true);

            if (data.question_ids[questionId]) {
              setIsPlaying(true);

              setAnswers(data.question_ids[questionId].answers);
            }
          },
        },
      ]);
    } else {
      Alert.alert('Wrong', 'Message', [
        {
          text: 'OK',
          onPress: async () => {
            setVisible(true);

            if (data.question_ids[questionId]) {
              setIsPlaying(true);

              setAnswers(data.question_ids[questionId].answers);
            }
          },
        },
      ]);
    }
    
  };
  const YesButton = ({title, handleAnswer, correct}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#7ed957',
          flex: 1,
          margin: 10,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        }}
        onPress={() => handleAnswer(correct && 'Yes')}>
        {/* onPress={() => Alert.alert(correct && 'Yes')}> */}
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

  const NoButton = ({title, handleAnswer, correct}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#ff5757',
          flex: 1,
          margin: 10,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        }}
        onPress={() => handleAnswer(correct && 'No')}>
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
  const handleClick = () => {};
  const Answer = ({answer}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={{color: '#ffffff', fontWeight: '400', fontSize: 20}}>
          {answer.label}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <YesButton
            title={answer.answer1}
            handleAnswer={handleAnswer}
            correct={answer.answer1 === answer.correct}
          />
          <NoButton
            title={answer.answer2}
            handleAnswer={handleAnswer}
            correct={answer.answer2 === answer.correct}
          />
        </View>
      </View>
    );
  };
  const AnswerView = ({answers}) => {
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
              {(questionId + 1) + '/' + data.question_ids.length}
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
            }}
            onPress={handlePressVideo}>
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
        {isPlaying === false && (
          <>
            {answers.map((item) => (
              <Answer answer={item} />
            ))}

            <Text style={{color: '#ffffff', fontWeight: '700', fontSize: 17}}>
              TIMER
            </Text>
            <CountdownCircle
              seconds={3}
              radius={30}
              borderWidth={8}
              color="#ff003f"
              bgColor="#fff"
              textStyle={{fontSize: 20}}
              onTimeElapsed={handleTimeElapsed}
            />
          </>
        )}
      </View>
    );
  };

  const playVideo = () => {
    setIsPaused(false);
    player.current.seek(0);
    setVisible(false);
  };

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <Overlay
        isVisible={visible}
        onBackdropPress={playVideo}
        supportedOrientations={['landscape']}
        overlayStyle={styles.overlay}
      />
      <View
        style={{
          flex: 1,
          width: '50%',
          height: '100%',
          justifyContent: 'center',
        }}>
        <Video
          ref={player}
          style={styles.player}
          source={{uri: videoUrl}}
          onBeforePlay={onBeforePlay}
          paused={isPaused}
          onEnd={onIdle}
          resizeMode="stretch"
        />
      </View>
      <View style={{flex: 1, width: '50%', backgroundColor: '#333333'}}>
        <AnswerView answers={answers} />
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
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,1)',

    right: '25%',
  },
});

export default QuizView;
