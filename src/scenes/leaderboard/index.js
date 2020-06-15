import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class LeaderBoard extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: 'https://appliedvisionbaseball.com/leadership/'
        }}
        style={{ marginTop: 20 }}
      />
    );
  }
}

export default LeaderBoard;