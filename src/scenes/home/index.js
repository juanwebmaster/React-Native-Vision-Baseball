import React ,{useState, useEffect} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { get_carousel_data } from '../../apis'
import {SliderBox} from 'react-native-image-slider-box'
import CustomCarousel from '_organisms/CustomCarousel'
import CustomCarouselSplit from '_organisms/CustomCarouselSplit'
import {
  Dimensions,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Carousel,
  ScrollView
} from 'react-native';
const Drawer = createDrawerNavigator();
const Home = ({name}) => {
  const [topMenu, setTopMenu] = useState(0);
  const [tutorialImages, setTutorialImages] = useState(0);
  const [popPitchers, setPopPitchers] = useState(0);
  const [specializedDrills, setSpecializedDrills] = useState(0);
  const [proLevel, setProLevel] = useState(0);
  const [schoolLevel, setSchoolLevel] = useState(0);
  const [youthLevel, setYouthLevel] = useState(0);
  const [recognitionTrain, setRecognitionTrain] = useState(0);
  useEffect ( async () => {
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
  }, [])
      
  return (
    
    <SafeAreaView style={styles.container}>
      
      <ScrollView style={styles.scrollView}
        scrollEnabled={true}
      >
        
        <CustomCarousel items={topMenu} />
        <CustomCarouselSplit items={tutorialImages} title='Tutorials >>>'/>
        <CustomCarousel items={popPitchers} title='Most Popular Pitchers >>>'/>
        <CustomCarouselSplit items={specializedDrills} title='Specialized Drills >>>'/>
        <CustomCarouselSplit items={proLevel} title='Pro Level >>>'/>
        <CustomCarouselSplit items={schoolLevel} title='College & Highschool Level >>>'/>
        <CustomCarouselSplit items={youthLevel} title='Youth Level Pitchers >>>'/>
        <CustomCarouselSplit items={recognitionTrain} title='Spin, Speed Recognition Training >>>'/>
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
    marginHorizontal: 20
  }
  
});
export default Home;
