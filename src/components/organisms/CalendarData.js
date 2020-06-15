import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ImageBackground, Image} from 'react-native';
import {get_calendar_data} from '_apis';
const CalendarData = () => {
  const [userCalendar, setUserCalendar] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const uCalendar = await get_calendar_data(1957);
      setUserCalendar(uCalendar);
    }
    fetchData();
  }, []);
  return (
    <View style={styles.CalendarDataStyle}>
      <Text style={styles.CalendarTextStyle}>
        {'>  30 Day Login\nStreak Challenge  <'}
      </Text>
      {userCalendar.map((item, index) => (
        <View style={styles.CalendarItemStyle} key={index}>
          <Text>{'Day ' + item.order}</Text>
          <ImageBackground
            key={index}
            style={styles.CalendarItemStyle}
            source={{uri: item.thumbnail}}>
            <Image
              key={index}
              style={styles.CalendarItemStyle}
              source={{uri: item.stamp_url}}></Image>
          </ImageBackground>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  CalendarItemStyle: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  CalendarDataStyle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingLeft: 30,
    paddingBottom: 50,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    width: global.SCREEN_WIDTH,

    alignItems: 'center',
    alignSelf: 'baseline',
    alignContent: 'center',
  },
  CalendarTextStyle: {
    marginBottom: 20,
    marginTop: 20,
    fontSize: 30,
  },
});

export default CalendarData;
