import React, {useState, useEffect, useRef} from 'react';
import {get_quiz_data} from '../../apis';
import SafeAreaView from 'react-native-safe-area-view';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import { Button } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import Orientation from 'react-native-orientation';
import JWPlayer from 'react-native-jw-media-player';
import ProgressBar from 'react-native-progress/Bar';
// import {StyleSheet, ScrollView} from 'react-native';
// import {Header} from 'react-native-elements';
// import HeaderIcon from '_atoms/HeaderIcon';
// import CustomFooter from '_organisms/CustomFooter';
const BASE_IMAGE_URL = 'https://content.jwplatform.com/v2/media/';
const BASE_VIDEO_URL = 'https://content.jwplatform.com/manifests/'



const QuizScreen = ({route, navigation}) => {
  const {data} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentOrientation, setCurrentOrientation] = useState(Orientation.getInitialOrientation());
  const [index, setIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState(BASE_IMAGE_URL + data.question_ids[index].url + '/poster.jpg');
  const [videoUrl, setVideoUrl] = useState(BASE_VIDEO_URL + data.question_ids[index].url + '.m3u8');
  const [answers, setAnswers] = useState(data.question_ids[index].answers);
  const [isPlaying, setIsPlaying] = useState('false');
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(progress);
  progressRef.current = progress;
  //   const [levelData, setLevelData] = useState({});
  const player = useRef(null);

  
  
  const handleOrientation = (orientation) => {
    setCurrentOrientation(orientation);
  };
  
  const playlistItem= {
    title: '',
    mediaId: '1',
    image: imageUrl,
    desc: '',
    time: 1,
    file: videoUrl,
//    file: 'http://file.com/file.mp3',
    autostart: false,
    controls: true,
    repeat: false,
    displayDescription: true,
    displayTitle: true
  }

  const onIdle = () => {
    setIsPlaying(false);
    const timerId = setInterval(() => {setProgress(progressRef.current + 0.1); console.log(progressRef.current)}, 200);
    // after 5 seconds stop
    
    setTimeout(() => { clearInterval(timerId);  }, 3000);
    setIndex(index + 1);
    if (data.question_ids[index]) {
      setImageUrl(BASE_IMAGE_URL + data.question_ids[index].url + '/poster.jpg');
      setVideoUrl(BASE_VIDEO_URL + data.question_ids[index].url + '.m3u8');
      setAnswers(data.question_ids[index].answers);
    }
  }
  const onPlay = () => {
    setIsPlaying(true);
    setProgress(0);
  }
  
  const handleClick = () => {
    setStarted(true);
  }
  const LandScapeView = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#333333'}}>
        <Text style={{color:'#ffffff', fontSize:30}}>{data.quiz_title}</Text>
        <Text style={{color:'#ffffff', fontSize:20, textAlign:'center'}}>{data.quiz_description}</Text>
        <Button title="Start" onPress={handleClick}/>
      </View>
    );
  };
  const PortraitView = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{width: 300, height: 300}}
          source={require('../../assets/images/rotate.png')}></Image>
        <Text style={{fontSize: 30}}>Please Rotate your Device</Text>
      </View>
    );
  };
  const QuizView = () => {
    return (
      <View style={{flex:1, flexDirection:'row'}}>
        <View style={{ flex: 1, width:'50%' }}>
          <JWPlayer
            ref={player}
            style={styles.player}
            playlistItem={playlistItem} // Recommended - pass the playlistItem as a prop into the player
            // playlist={[playlistItem]}
            //onBeforePlay={() => this.onBeforePlay()}
            onPlay={onPlay}
            //onPause={() => this.onPause()}
            onIdle={onIdle}
            //onPlaylistItem={event => this.onPlaylistItem(event)}
            //onSetupPlayerError={event => this.onPlayerError(event)}
            //onPlayerError={event => this.onPlayerError(event)}
            //onBuffer={() => this.onBuffer()}
            //onTime={event => this.onTime(event)}
            //onFullScreen={() => this.onFullScreen()}
            //onFullScreenExit={() => this.onFullScreenExit()}
          />
        </View>
        <View style={{ flex: 1, width:'50%', backgroundColor: '#333333',}}>
          {!isPlaying && <AnswerView /> }
        </View>
      </View>
      
    )
  }

  const YesButton = ({title}) => {
    return (
      <TouchableOpacity style={{backgroundColor:"#7ed957", flex:1, margin:10, padding:10, justifyContent:'center', alignItems:'center', borderRadius:8}} >
      <Text style={{color:'#ffffff',fontSize:17, paddingLeft:20, paddingRight:20, fontWeight:'900'}}>{title}</Text>
      </TouchableOpacity>
    )
  }

  const NoButton = ({title}) => {
    return (
      
      <TouchableOpacity  style={{backgroundColor:"#ff5757", flex:1, margin:10, padding:10, justifyContent:'center', alignItems:'center', borderRadius:8}} >
      <Text style={{color:'#ffffff',fontSize:17, paddingLeft:20, paddingRight:20, fontWeight:'900'}}>{title}</Text>
      </TouchableOpacity>
    )
  }
  const Answer = ({answer}) => {
    return (
      <View style={{alignItems:'center', }}>
        <Text style={{color:'#ffffff', fontWeight:'400', fontSize:20}}>{answer.label}</Text>
        <View style={{ flexDirection:'row'}}>
          <YesButton title={answer.answer1} />
          <NoButton title={answer.answer2} />
        </View>
      </View>
    )
    
  }
  const AnswerView = () => {
    return (
      <View style={{marginRight:50, flex:1, alignItems:'center'}}>
        <View style={{flexDirection:'row', alignItems:'center', width:400, justifyContent:'space-between', paddingLeft:20}}>
          <View>
            <Text style={{color:'#ffffff',fontSize:20}}>{index + '/' + data.question_ids.length}</Text>
            <Text style={{color:'#ffffff',fontSize:17}}>Pitch Count</Text>
          </View>
          
          <TouchableOpacity  style={{backgroundColor:'#1E73BE', margin:10, padding:10, justifyContent:'center', alignItems:'center', borderRadius:8}} >
            <Text style={{color:'#ffffff',fontSize:17, paddingLeft:20, paddingRight:20, fontWeight:'900'}}>Next</Text>
          </TouchableOpacity>
        </View>
        {answers.map(item => <Answer answer={item} />)}
        <Text style={{color:'#ffffff', fontWeight:'700',fontSize:17}}>TIMER</Text>
        <ProgressBar progress={progress} width={400} height={20}/>
      </View>
    )
  }

  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);
    // return () => {
    //   Orientation.removeOrientationListener(handleOrientation);
    // };
  }, []);
  return (
    <View style={styles.container}>
      {currentOrientation === 'PORTRAIT' && <PortraitView />}
      {currentOrientation === 'LANDSCAPE' && started && <QuizView />}
      {currentOrientation === 'LANDSCAPE' && !started && <LandScapeView />}
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    
  },
  sliderContainer: {
    backgroundColor: 'rgb(0,0,0)',
  },
  scrollView: {
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  imageBackgroundStyle: {
    height: 30,
    width: 40,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    flex: 1,
    width: '100%',
  }
});
export default QuizScreen;
