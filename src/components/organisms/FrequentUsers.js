import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ImageBackground, Image} from 'react-native';
import {DataTable} from 'react-native-paper';
import {get_ranking_data} from '../../apis';
const FrequentUsers = () => {
  const [rankingData, setRankingData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const rData = await get_ranking_data(2020);
      setRankingData(rData);
    }
    fetchData();
  }, []);
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
            <DataTable.Cell>{index + 1}</DataTable.Cell>
            <DataTable.Cell>
              <ImageBackground
                style={styles.RankingItemStyle}
                source={{uri: item.avatar}}></ImageBackground>
            </DataTable.Cell>

            <DataTable.Cell>{item.user_name}</DataTable.Cell>
            <DataTable.Cell numeric>{item.training_day}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  FrequentUsersStyle: {
    flex: 1,
    flexWrap: 'wrap',
    padding: 50,
    marginTop: 20,
    marginBottom:50,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    width: global.SCREEN_WIDTH,

    alignItems: 'center',
    alignSelf: 'baseline',
    alignContent: 'center',
  },
  RankingItemStyle: {
    width: 20,
    height: 20,
  },
  RankingTableStyle: {
    flex: 1,
    height: 100,
    width: global.SCREEN_WIDTH,
  },
  RankingRowStyle: {
    flexDirection: 'row',
  },
});

export default FrequentUsers;
