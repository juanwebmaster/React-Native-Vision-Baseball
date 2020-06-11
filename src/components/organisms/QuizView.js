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
import {Overlay, Icon} from 'react-native-elements';

const BASE_IMAGE_URL = 'https://content.jwplatform.com/v2/media/';
const BASE_VIDEO_URL = 'https://content.jwplatform.com/manifests/';
//let questionId = 0;
const QuizView = ({data}) => {
  const [questionId, setQuestionId] = useState(0);
  const [answerVisible, setAnswerVisible] = useState(true);
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
  const [answerId, setAnswerId] = useState(0);
  const player = useRef(null);
  const [visible, setVisible] = useState(true);
  const [changeStyle, setChangeStyle] = useState(false);
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
              setShowAnswer(false);
            }
          },
        },
      ]);
    }
  };
  const onIdle = () => {
    setIsPlaying(false);
    setIsPaused(true);
    setShowAnswer(true);
    if (data.question_ids.length > questionId) {
      setQuestionId(questionId + 1);
      setImageUrl(
        BASE_IMAGE_URL + data.question_ids[questionId].url + '/poster.jpg',
      );
      setVideoUrl(BASE_VIDEO_URL + data.question_ids[questionId].url + '.m3u8');
    }
  };

  const onBeforePlay = () => {};
  const handleAnswer = (sel, id) => {
    setSelAnswer(sel);
    console.log('selectedanswer=>==========>', sel);
    if (sel == 1) setThumbs('correct');
    else setThumbs('incorrect');

    setChangeStyle(true);
    setAnswerId(id);
    console.log('selectedanswerIDDDDD=>==========>', answerId);
    setTimeout(() => {
      // setVisible(true);
      // setShowAnswer(false);
      // setThumbs('');
      // if (data.question_ids[questionId]) {
      //   setIsPlaying(true);
      //   setAnswers(data.question_ids[questionId].answers);
      // }
      setAnswerId(0);
      setChangeStyle(false);
    }, 2000);
  };
  const YesButton = ({title, handleAnswer, correct, id}) => {
    return (
      <TouchableOpacity
        style={
          changeStyle
            ? correct == 1
              ? styles.correctButtonStyle
              : styles.YesButtonStyle
            : styles.YesButtonStyle
        }
        onPress={() => handleAnswer(correct, id)}>
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

  const NoButton = ({title, handleAnswer, correct, id}) => {
    console.log('1111111111111111=================',id,answerId, id == answerId)
    return (
      <TouchableOpacity
        style={
          changeStyle
            ? correct == 1
              ? styles.correctButtonStyle
              : styles.NoButtonStyle
            : id == answerId
            ? styles.wrongButtonStyle
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
  const handleClick = () => {};
  const Answer = ({answer}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={{color: '#ffffff', fontWeight: '400', fontSize: 20}}>
          {answer.label}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <YesButton
            title={answer.answer1.answer}
            handleAnswer={handleAnswer}
            correct={answer.answer1.correct}
            id={answer.answer1.id}
          />
          <NoButton
            title={answer.answer2.answer}
            handleAnswer={handleAnswer}
            correct={answer.answer2.correct}
            id={answer.answer2.id}
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
              {questionId + 1 + '/' + data.question_ids.length}
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
        {answers.map((item) => (
          <Answer answer={item} />
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
        {/* <Overlay
          isVisible={visible}
          onBackdropPress={playVideo}
          supportedOrientations={['landscape']}
          overlayStyle={styles.overlayVideo}
          backdropStyle={styles.backdropVideo}
          children={Video}
        /> */}
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
            {/* {<i class="fa fa-play" aria-hidden="true"></i>} */}
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
          onBeforePlay={onBeforePlay}
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
    zIndex: 200,
  },

  correctButtonStyle: {
    backgroundColor: 'rgba(255, 166, 40, 0.8)',
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

export default QuizView;
