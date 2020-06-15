import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class Tutorials extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: 'https://appliedvisionbaseball.com/pitch-recognition-drills-tutorials/'
        }}
        style={{ marginTop: 20 }}
      />
    );
  }
}

export default Tutorials;