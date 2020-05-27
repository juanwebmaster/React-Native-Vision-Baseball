import React, {useState, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DataTable} from 'react-native-paper';
import {
  get_carousel_data,
  get_user_data,
  get_ranking_data,
} from '../../apis';
import CustomCarousel from '_organisms/CustomCarousel';
import CustomCarouselSplit from '_organisms/CustomCarouselSplit';
import SafeAreaView from 'react-native-safe-area-view';
import {Header} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import CalendarData from '_organisms/CalendarData';
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  Text,
  ScrollView,
  ImageBackground,
  ImageBackgroundComponent,
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
  const [userData, setUserData] = useState({});
  
  const [rankingData, setRankingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const rData = await get_ranking_data(2020);
      setRankingData(rData);
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


  const UserCircleData = ({counts, imgUrl, label}) => {
    return (
      <View>
        <ImageBackground style={styles.circleStyle} source={{uri: imgUrl}}>
          <Text style={styles.CircleText}>{counts}</Text>
        </ImageBackground>
        <Text style={{color: '#ffffff', textAlign: 'center', fontSize:20}}>{label}</Text>
      </View>
    );
  };

  const FrequentUsers = () => {
    return (
      <View style={styles.FrequentUsersStyle}>
        <Text style={{fontSize: 27, fontWeight: '500', paddingBottom: 10}}>
          Top Frequent Users
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontWeight: '400',
            paddingBottom: 10,
            paddingRight: 20,
          }}>
          This is a leaderboard of the top hitters in Applied Vision Baseball.
          Upload your profile pic here.
        </Text>
        <Text>Search:</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>No</DataTable.Title>
            <DataTable.Title>Avatar</DataTable.Title>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title numeric>Trained Days</DataTable.Title>
          </DataTable.Header>
          {rankingData.map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{index+1}</DataTable.Cell>
              <DataTable.Cell><ImageBackground
                style={styles.RankingItemStyle}
                source={{uri: item.avatar}}>
              </ImageBackground></DataTable.Cell>
              
              <DataTable.Cell>{item.user_name}</DataTable.Cell>
              <DataTable.Cell numeric>{item.training_day}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    );
  };

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
      <Spinner visible={isLoading} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} />
      <Header
        rightComponent={{
          icon: 'menu',
          // backgroundColor: '#3e8ae6',
          color: '#fff',
          height: '150%',
        }}
        leftComponent={headerIcon}
      />
      <ScrollView style={styles.scrollView} scrollEnabled={true}>
        <View style={{marginTop: 30, marginBottom: 50}}>
          <UserCircleData
            style={styles.CircleDataStyle}
            counts={userData.login_count}
            imgUrl={userData.img_url1}
            label="Total Login Days"
          />
          <UserCircleData
            counts={userData.session_count}
            imgUrl={userData.img_url1}
            label="Sessions Completed"
          />
          <UserCircleData
            counts={userData.user_trained_time}
            imgUrl={userData.img_url2}
            label="Total Time Trained"
          />
        </View>

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
  circleStyle: {
    width: 130,
    height: 130,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    margin: 5,
  },
  CircleDataStyle: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  CircleText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center'
  },
  
  FrequentUsersStyle: {
    flex: 1,
    flexWrap: 'wrap',
    padding: 50,
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    width: SCREEN_WIDTH,

    alignItems: 'center',
    alignSelf: 'baseline',
    alignContent: 'center',
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
  RankingItemStyle: {
    width: 20,
    height: 20,
    
  },
  RankingTableStyle: {
    flex:1,
    height:100,
    width: SCREEN_WIDTH,
  },
  RankingRowStyle: {
    flexDirection: 'row'
  }, 
  FooterLogoStyle: {
    width: 200,
    height: 120,
    paddingTop: 50,
    paddingBottom: 50,

    resizeMode: 'stretch',
  },

  spinnerTextStyle: {
    color: '#FFF'
  },
  
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color:'#333333',
    marginBottom: 5
  }
});
export default Home;
