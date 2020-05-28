import React, {useState, useEffect} from 'react';
import FrequentUsers from '_organisms/FrequentUsers';
import {get_carousel_data,get_bodybkcolor_data, get_ranking_data} from '../../apis';
import CustomCarousel from '_organisms/CustomCarousel';
import CustomCarouselSplit from '_organisms/CustomCarouselSplit';
import SafeAreaView from 'react-native-safe-area-view';
import {Header} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import CalendarData from '_organisms/CalendarData';
import UserLoginData from '_organisms/UserLoginData'
import CustomFooter from '_organisms/CustomFooter'
import HeaderIcon from '_atoms/HeaderIcon';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

const Home = ({name}) => {
  const [topMenu, setTopMenu] = useState(0);
  const [tutorialImages, setTutorialImages] = useState(0);
  const [popPitchers, setPopPitchers] = useState(0);
  const [specializedDrills, setSpecializedDrills] = useState(0);
  const [proLevel, setProLevel] = useState(0);
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
    async function get_menu() {
      const menus = await get_carousel_data(1235);
      setTopMenu(menus);
    }
    async function get_tutorials() {
      const tutorials = await get_carousel_data(1935);
      setTutorialImages(tutorials);
    }
    async function get_pitchers() {
      const pitchers = await get_carousel_data(1224);
      setPopPitchers(pitchers);
    }
    async function get_drills() {
      const drills = await get_carousel_data(1218);
      setSpecializedDrills(drills);
    }
    async function get_plevel() {
      const plevel = await get_carousel_data(1226);
      setProLevel(plevel);
    }
    async function get_slevel() {
      const slevel = await get_carousel_data(1228);
      setSchoolLevel(slevel);
    }
    async function get_ylevel(){
      const ylevel = await get_carousel_data(1864);
      setYouthLevel(ylevel);
    }
    async function get_rTrain() {
      const rTrain = await get_carousel_data(2645);
      setRecognitionTrain(rTrain);
      setIsLoading(false);
    }  
    get_color();
    get_menu();
    get_tutorials();
    get_drills();
    get_plevel();
    get_slevel();
    get_ylevel();
    get_rTrain();
    get_pitchers();
    
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
        <CustomCarousel items={topMenu} />
        <View
          style={{
            marginTop: 60,
            borderBottomWidth: 2,
            borderColor: '#888888',
          }}></View>
        <CustomCarouselSplit items={tutorialImages} title="Tutorials >>>" />
        <CustomCarousel items={popPitchers} title="Most Popular Pitchers >>>" />
        <CustomCarouselSplit
          items={specializedDrills}
          title="Specialized Drills >>>"
        />
        <CustomCarouselSplit items={proLevel} title="Pro Level >>>" />
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
