import React, {useState, useEffect} from 'react';
import {WebView} from 'react-native-webview';
import { ScrollView, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import axios from 'axios';
const sendLoginRequest = async (email, password) => {
  const formData = new FormData();
  formData.append('log', email);
  formData.append('pwd', password);
  const res = await axios.post(
    'http://localhost:8888/vision-baseball/wp-login.php',
    formData,
    {
      headers: {'Content-Type': 'multipart/form-data'},
    },
  );
  return res;
};
const MyAccount = () => {
  const [data, setData] = useState('');
  useEffect(() => {
    async function fetchData() {
      const sData = await sendLoginRequest('guest', 'Marius4Spata!!');
      setData(sData);
      console.log("data => ",sData);
    }
    fetchData();
    
  }, []);
  
   return (
     <>
      <HTML html={`{data}`} />
     </>
    // <WebView
    //   source={{
    //     uri: 'http://localhost:8888/vision-baseball/my-account',
    //   }}
      
    // />
  );
};

export default MyAccount;
