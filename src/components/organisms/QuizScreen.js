import React, {useState, useEffect} from 'react';
import {get_quiz_data} from '../../apis';
import SafeAreaView from 'react-native-safe-area-view';
import {Text, StyleSheet, View, Image} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Orientation from 'react-native-orientation';
// import {StyleSheet, ScrollView} from 'react-native';
// import {Header} from 'react-native-elements';
// import HeaderIcon from '_atoms/HeaderIcon';
// import CustomFooter from '_organisms/CustomFooter';

const QuizScreen = ({route, navigation}) => {
  const {id} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [currentOrientation, setCurrentOrientation] = useState('PORTRAIT');
  //   const [levelData, setLevelData] = useState({});

  const handleOrientation = (orientation) => {
    setCurrentOrientation(orientation);
  };
  const LandScapeView = () => {
    return <Text>LandScapeView</Text>;
  };
  const PortraitView = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{width: 300, height:300}} source={require('../../assets/images/rotate.png')}></Image>
        <Text style={{fontSize:30}}>Please Rotate your Device</Text>
      </View>
    );
  };
  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);
    // return () => {
    //   Orientation.removeOrientationListener(handleOrientation);
    // };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {currentOrientation === 'PORTRAIT' && <PortraitView />}
      {currentOrientation === 'LANDSCAPE' && <LandScapeView />}
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
    </SafeAreaView>
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
});
export default QuizScreen;
