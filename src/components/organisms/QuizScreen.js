import React, {useState, useEffect, useRef} from 'react';
import {get_quiz_data} from '../../apis';
import SafeAreaView from 'react-native-safe-area-view';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import PrefersHomeIndicatorAutoHidden from 'react-native-home-indicator';
import { Button } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import QuizView from '_components/organisms/QuizView'
import Orientation from 'react-native-orientation-locker';
const QuizScreen = ({route, navigation}) => {
  const {data} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [started, setStarted] = useState(false);
  //const [currentOrientation, setCurrentOrientation] = useState(Orientation.getInitialOrientation());
  const handleOrientation = (orientation) => {
    setCurrentOrientation(orientation);
  };
  
  useEffect(() => {
    //Orientation.addOrientationListener(handleOrientation);
    Orientation.lockToLandscape();
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

  
  return (
    <View style={styles.container}>
      <PrefersHomeIndicatorAutoHidden />
      
      
      {started && <QuizView data={data}/>}
      {!started && <LandScapeView />}
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
    width: '50%',
    
    justifyContent:'center',
    alignItems:'center',
  }
});
export default QuizScreen;
