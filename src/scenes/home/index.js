import React, {useState, useEffect} from 'react';
import FrequentUsers from '_organisms/FrequentUsers';
import {get_carousel_data, get_bodybkcolor_data} from '../../apis';
import CustomCarouselSplit from '_organisms/CustomCarouselSplit';
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
import {View, StyleSheet, ScrollView} from 'react-native';
import ProLevelCarousel from '_organisms/ProLevelCarousel';

const Home = ({name}) => {
  
  const [schoolLevel, setSchoolLevel] = useState(0);
  const [youthLevel, setYouthLevel] = useState(0);
  const [recognitionTrain, setRecognitionTrain] = useState(0);
  const [bkColor, setBkColor] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function get_color() {
      const bColor = await get_bodybkcolor_data(1206);
      setBkColor(bColor);
    }

    
    async function get_slevel() {
      const slevel = await get_carousel_data(1228);
      setSchoolLevel(slevel);
    }
    async function get_ylevel() {
      const ylevel = await get_carousel_data(1864);
      setYouthLevel(ylevel);
    }
    async function get_rTrain() {
      const rTrain = await get_carousel_data(2645);
      setRecognitionTrain(rTrain);
      setIsLoading(false);
    }
    get_color();

    
    get_slevel();
    get_ylevel();
    get_rTrain();
  }, []);

  return (
    <SafeAreaView style={styles.container} style={{backgroundColor: bkColor}}>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <Header
        rightComponent={{
          icon: 'menu',
          color: '#fff',
          height: '150%',
        }}
        leftComponent={HeaderIcon}
      />
      <ScrollView style={styles.scrollView} scrollEnabled={true}>
        <UserLoginData />
        <TopMenuCarousel />
        <View
          style={{
            marginTop: 60,
            borderBottomWidth: 2,
            borderColor: '#888888',
          }}></View>
        <TutorialsCarousel />
        <PopPitchersCarousel />
        <DrillsCarousel />
        <ProLevelCarousel />
        <CustomCarouselSplit
          items={schoolLevel}
          title="College & Highschool Level >>>"
        />
        <CustomCarouselSplit
          items={youthLevel}
          title="Youth Level Pitchers >>>"
        />
        <CustomCarouselSplit
          items={recognitionTrain}
          title="Spin, Speed Recognition Training >>>"
        />
        <CalendarData />
        <FrequentUsers />
        <CustomFooter />
      </ScrollView>
    </SafeAreaView>
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
