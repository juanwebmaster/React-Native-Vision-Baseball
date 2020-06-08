import React, {useState, useEffect, useRef} from 'react';
import {get_quiz_data} from '../../apis';
import SafeAreaView from 'react-native-safe-area-view';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import PrefersHomeIndicatorAutoHidden from 'react-native-home-indicator';
import { Button } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import Orientation from 'react-native-orientation';
import QuizView from '_components/organisms/QuizView'

const QuizScreen = ({route, navigation}) => {
  const {data} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentOrientation, setCurrentOrientation] = useState(Orientation.getInitialOrientation());
  const handleOrientation = (orientation) => {
    setCurrentOrientation(orientation);
  };
  
  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);
  }, []);

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

  
  return (
    <View style={styles.container}>
      <PrefersHomeIndicatorAutoHidden />
      
      {currentOrientation === 'PORTRAIT' && <PortraitView />}
      {currentOrientation === 'LANDSCAPE' && started && <QuizView data={data}/>}
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
    justifyContent:'center',
    alignItems:'center',
  }
});
export default QuizScreen;
