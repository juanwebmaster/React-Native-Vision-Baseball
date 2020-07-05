import React, {useState, useEffect} from 'react';
import {WebView} from 'react-native-webview';
import {ScrollView, Dimensions} from 'react-native';
import HTML from 'react-native-render-html';
import axios from 'axios';

const MyAccount = () => {
  return (
    <WebView
      source={{
        uri: 'https://appliedvisionbaseball.com/my-account',
      }}
    />
  );
};

export default MyAccount;
