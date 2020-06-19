import React, {useState, useEffect} from 'react';
import FrequentUsers from '_organisms/FrequentUsers';
import {get_bodybkcolor_data} from '_apis';
import RecognitionTrainCarousel from '_organisms/RecognitionTrainCarousel';
import { useFocusEffect } from '@react-navigation/native';
import SafeAreaView from 'react-native-safe-area-view';
import {Header} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import CalendarData from '_organisms/CalendarData';
import UserLoginData from '_organisms/UserLoginData';
import CustomFooter from '_organisms/CustomFooter';
import HeaderIcon from '_atoms/HeaderIcon';
import TutorialsCarousel from '_organisms/TutorialsCarousel';
import TopMenuCarousel from '_organisms/TopMenuCarousel';
import PopPitchersCarousel from '_organisms/PopPitchersCarousel';
import DrillsCarousel from '_organisms/DrillsCarousel';
import {View, StyleSheet, ScrollView, Text, Image} from 'react-native';
import ProLevelCarousel from '_organisms/ProLevelCarousel';
import SchoolLevelCarousel from '_organisms/SchoolLevelCarousel';
import YouthLevelCarousel from '_organisms/YouthLevelCarousel';
import PrefersHomeIndicatorAutoHidden from 'react-native-home-indicator';
import Orientation from 'react-native-orientation-locker';

const Home = ({name, navigation}) => {
  const [bkColor, setBkColor] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [reset, setReset] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      
    }, [])
  )

  useEffect(() => {
    async function get_color() {
      const bColor = await get_bodybkcolor_data(1206);
      setBkColor(bColor);
      setIsLoading(false);
    }
    Orientation.lockToPortrait();
    get_color();
  }, []);

  return (
    <View style={styles.container} style={{backgroundColor: bkColor}}>
    {/* <SafeAreaView style={styles.container} style={{backgroundColor: bkColor}}> */}
      <PrefersHomeIndicatorAutoHidden />
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <Header
        containerStyle={{
          justifyContent: 'space-around',
          paddingTop:0,
          paddingBottom:0,
          height:100,
        }}
        rightComponent={{
          icon: 'menu',
          color: '#fff',
          onPress: () => {
            navigation.toggleDrawer();
          },
        }}
        
        leftComponent={
          <HeaderIcon />
        }
      />
      <ScrollView style={styles.scrollView} scrollEnabled={true}>
        <UserLoginData />
        <TopMenuCarousel navigation={navigation} />
        <View
          style={{
            marginTop: 60,
            borderBottomWidth: 2,
            borderColor: '#888888',
          }}></View>
        <TutorialsCarousel navigation={navigation} backColor={bkColor} />
        <PopPitchersCarousel navigation={navigation} backColor={bkColor} />
        <DrillsCarousel navigation={navigation} backColor={bkColor} />
        <ProLevelCarousel navigation={navigation} backColor={bkColor} />
        <SchoolLevelCarousel navigation={navigation} backColor={bkColor} />
        <YouthLevelCarousel navigation={navigation} backColor={bkColor} />
        <RecognitionTrainCarousel navigation={navigation} backColor={bkColor} />
        <CalendarData />
        {/* <FrequentUsers /> */}
        <CustomFooter />
      </ScrollView>
    {/* </SafeAreaView> */}
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  sliderContainer: {
    margin: 20,
  },
  scrollView: {
    marginHorizontal: 20,
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
export default Home;
