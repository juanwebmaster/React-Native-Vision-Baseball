import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class StatusView extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: 'https://appliedvisionbaseball.com/statistic-page/'
        }}
        style={{ marginTop: 20 }}
      />
    );
  }
}

export default StatusView;