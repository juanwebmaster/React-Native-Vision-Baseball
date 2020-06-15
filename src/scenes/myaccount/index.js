import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class MyAccount extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: 'https://appliedvisionbaseball.com/my-account/'
        }}
        style={{ marginTop: 20 }}
      />
    );
  }
}

export default MyAccount;
