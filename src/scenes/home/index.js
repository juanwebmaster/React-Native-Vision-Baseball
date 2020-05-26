import React, {useState, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {get_carousel_data, get_user_data} from '../../apis';
import CustomCarousel from '_organisms/CustomCarousel';
import CustomCarouselSplit from '_organisms/CustomCarouselSplit';
import SafeAreaView from 'react-native-safe-area-view';
import {Header} from 'react-native-elements';
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  Text,
  ScrollView,
  ImageBackground,
  ImageBackgroundComponent,
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
  const [userData, setUserData] = useState({});
  useEffect(() => {
    async function fetchData() {
      const uData = await get_user_data(90);
      setUserData(uData);
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
    }
    fetchData();
  }, []);
  
  const headerIcon = () => (
    <View style={styles.logoContainer}>
        <Image
          resizeMode='center'
          style={styles.logo}
          source={require('../../assets/images/header.png')}
        />
      </View>
  );

  const UserCircleData = ({text, imgUrl}) => {
    return (
      <ImageBackground style={styles.circleStyle} source={{uri: imgUrl}}>
        <Text>{text}</Text>
      </ImageBackground>
    );
  };
  
 
  return (
    <SafeAreaView style={styles.container}>
      <Header
        rightComponent={{icon: 'menu', color: '#fff', height: '150%'}}
        leftComponent={headerIcon}
      />
      <ScrollView style={styles.scrollView} scrollEnabled={true}>
        <UserCircleData text={userData.login_count} imgUrl={userData.img_url} />
        <UserCircleData text={userData.session_count} imgUrl={userData.img_url} />
        <UserCircleData text={userData.user_trained_time} imgUrl={userData.img_url} />
        <CustomCarousel items={topMenu} />
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
    height:30,
    width: 40,
  },
  logo: {
    width: 150,
    height: 80,
    marginLeft:20,
    
  },
  logoContainer: {
    
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  circleStyle: {
    width: 100,
    height: 100,
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
});
export default Home;
