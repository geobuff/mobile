import React, { useEffect, useRef } from 'react';
import { WEBVIEW_URL } from '@env';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { WebView } from 'react-native-webview';

const run = `
      document.body.style.backgroundColor = 'blue';
      true;
    `;

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const SafeStatusBar = () => (
    <SafeAreaView>
      <StatusBar translucent backgroundColor="white" barStyle="dark-content" />
    </SafeAreaView>
  );

  const webViewRef = useRef();

  return (
    <View style={styles.flex}>
      <SafeStatusBar />
      {/* <View>{DeviceInfo.toString()}</View> */}
      <View style={styles.flex}>
        <WebView
          ref={ref => (webViewRef.current = ref)}
          originWhitelist={['*']}
          injectedJavaScript={run} // now injectedJavaScript will trigger along with the ref.
          source={{ uri: WEBVIEW_URL }}
          onMessage={event => {
            alert(event.nativeEvent.data);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default App;
