import React, {useState, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FrequentUsers from '_organisms/FrequentUsers';
import {get_carousel_data} from '../../apis';
import CustomCarousel from '_organisms/CustomCarousel';
import CustomCarouselSplit from '_organisms/CustomCarouselSplit';
import SafeAreaView from 'react-native-safe-area-view';
import {Header} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import CalendarData from '_organisms/CalendarData';
import UserLoginData from '_organisms/UserLoginData'
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const Home = ({name}) => {
  const [topMenu, setTopMenu] = useState(0);
  const [tutorialImages, setTutorialImages] = useState(0);
  const [popPitchers, setPopPitchers] = useState(0);
  const [specializedDrills, setSpecializedDrills] = useState(0);
  const [proLevel, setProLevel] = useState(0);
  const [schoolLevel, setSchoolLevel] = useState(0);
  const [youthLevel, setYouthLevel] = useState(0);
  const [recognitionTrain, setRecognitionTrain] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const menus = await get_carousel_data(1235);
      setTopMenu(menus);
      const tutorials = await get_carousel_data(1935);
      setTutorialImages(tutorials);
      const pitchers = await get_carousel_data(1224);
      setPopPitchers(pitchers);
      const drills = await get_carousel_data(1218);
      setSpecializedDrills(drills);
      const plevel = await get_carousel_data(1226);
      setProLevel(plevel);
      const slevel = await get_carousel_data(1228);
      setSchoolLevel(slevel);
      const ylevel = await get_carousel_data(1864);
      setYouthLevel(ylevel);
      const rTrain = await get_carousel_data(2645);
      setRecognitionTrain(rTrain);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const headerIcon = () => (
    <View style={styles.logoContainer}>
      <Image
        resizeMode="center"
        style={styles.logo}
        source={require('../../assets/images/header.png')}
      />
    </View>
  );

  const Footer = () => {
    return (
      <View style={styles.FooterStyle}>
        <Image
          resizeMode="center"
          style={styles.FooterLogoStyle}
          source={require('../../assets/images/logo2.png')}
        />
        <Text style={{textAlign: 'center', fontSize: 12, lineHeight: 30}}>
          2010-2020 Art of Baseball DBA Applied Vision Baseball. All Rights
          Reserved. SiteMap. Privacy Policy
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
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
        leftComponent={headerIcon}
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
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
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
  logo: {
    width: 150,
    height: 80,
    marginLeft: 20,
  },
  logoContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  

  FooterStyle: {
    backgroundColor: '#3e8ae6',
    marginTop: 50,
    paddingTop: 40,
    width: SCREEN_WIDTH * 0.9,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'baseline',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 50,
  },

  FooterLogoStyle: {
    width: 200,
    height: 120,
    paddingTop: 50,
    paddingBottom: 50,

    resizeMode: 'stretch',
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
