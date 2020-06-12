import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {get_user_data} from '_apis';
const UserLoginData = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    async function fetchData() {
      const uData = await get_user_data(90);
      setUserData(uData);
    }
    fetchData();
  }, []);

  const UserCircleData = ({counts, imgUrl, label}) => {
    return (
      <View>
        <ImageBackground style={styles.circleStyle} source={{uri: imgUrl}}>
          <Text style={styles.CircleText}>{counts}</Text>
        </ImageBackground>
        <Text style={{color: '#ffffff', textAlign: 'center', fontSize: 20}}>
          {label}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.UserLoginDataStyle}>
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
  );
};

const styles = StyleSheet.create({
  UserLoginDataStyle: {
    marginTop: 50,
    marginBottom: 50,
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
    textAlign: 'center',
  },
});

export default UserLoginData;
