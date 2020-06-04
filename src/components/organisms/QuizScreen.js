import React, {useState, useEffect, useRef} from 'react';
import {get_quiz_data} from '../../apis';
import SafeAreaView from 'react-native-safe-area-view';
import {Text, StyleSheet, View, Image, Button} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Orientation from 'react-native-orientation';
import JWPlayer from 'react-native-jw-media-player';
// import {StyleSheet, ScrollView} from 'react-native';
// import {Header} from 'react-native-elements';
// import HeaderIcon from '_atoms/HeaderIcon';
// import CustomFooter from '_organisms/CustomFooter';

const QuizScreen = ({route, navigation}) => {
  const {data} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentOrientation, setCurrentOrientation] = useState(Orientation.getInitialOrientation());
  //   const [levelData, setLevelData] = useState({});
  const player = useRef(null);

  const handleOrientation = (orientation) => {
    setCurrentOrientation(orientation);
  };
  const playlistItem= {
    title: '',
    mediaId: '1',
    image: '',
    desc: '',
    time: 1,
    file: 'https://content.jwplatform.com/manifests/JyTZpvdi.m3u8',
//    file: 'http://file.com/file.mp3',
    autostart: true,
    controls: true,
    repeat: false,
    displayDescription: true,
    displayTitle: true
  }
  const handleClick = () => {
    //console.log();
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
      <View style={{ flex: 1 }}>
        <Text>{data.question_ids}</Text>
         <JWPlayer
          ref={player}
          style={styles.player}
          playlistItem={playlistItem} // Recommended - pass the playlistItem as a prop into the player
          // playlist={[playlistItem]}
          //onBeforePlay={() => this.onBeforePlay()}
          onPlay={()=> {console.log('Playing')}}
          //onPause={() => this.onPause()}
          onIdle={() => console.log("onIdle")}
          //onPlaylistItem={event => this.onPlaylistItem(event)}
          //onSetupPlayerError={event => this.onPlayerError(event)}
          //onPlayerError={event => this.onPlayerError(event)}
          //onBuffer={() => this.onBuffer()}
          //onTime={event => this.onTime(event)}
          //onFullScreen={() => this.onFullScreen()}
          //onFullScreenExit={() => this.onFullScreenExit()}
        />
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
  }
});
export default QuizScreen;
