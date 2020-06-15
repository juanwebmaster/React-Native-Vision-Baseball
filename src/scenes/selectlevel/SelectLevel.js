import React, {useState, useEffect} from 'react';
import {get_level_data} from '_apis';
import SafeAreaView from 'react-native-safe-area-view';
import SelectLevelCarousel from '_organisms/SelectLevelCarousel';
import Spinner from 'react-native-loading-spinner-overlay';
import {StyleSheet, ScrollView} from 'react-native';
import CustomFooter from '_organisms/CustomFooter';
import Orientation from 'react-native-orientation-locker';
import HeaderIcon from '_atoms/HeaderIcon';
import {Header} from 'react-native-elements';
const SelectLevel = ({route, navigation}) => {
  const [state, setState] = useState("default");

  const {data} = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [levelData, setLevelData] = useState({
    items: {image: ""}
  });
  

  useEffect(() => {
    async function getLevelData() {
      const lData = await get_level_data(data.post_id);
      setLevelData(lData);
      setIsLoading(false);
    }
    Orientation.lockToPortrait();
    getLevelData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
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
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <ScrollView style={styles.scrollView} scrollEnabled={true}>
        <SelectLevelCarousel
          items={levelData}
          backgroundImage={data.img_url}
          //title="College & Highschool Level >>>"
          navigation={navigation}
          style={styles.sliderContainer}
        />
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
export default SelectLevel;
