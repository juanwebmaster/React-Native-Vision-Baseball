import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
const MyAccount = () => {
   return (

    <WebView
      source={{
        uri: 'http://localhost:8888/vision-baseball/my-account',
      }}
      
    />
  );
};

export default MyAccount;
