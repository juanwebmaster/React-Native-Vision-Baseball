import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class ModifyBilling extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: 'https://appliedvisionbaseball.com/modify-billing/'
        }}
        style={{ marginTop: 20 }}
      />
    );
  }
}

export default ModifyBilling;

