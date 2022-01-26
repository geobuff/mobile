import React, { useEffect, useRef, useState } from 'react';
import { WEBVIEW_URL } from '@env';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Text,
  Platform,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import DeviceInfo from 'react-native-device-info';

import { WebView } from 'react-native-webview';

const initialJS = `true;`;

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
  const [injectedJavaScript, setInjectedJavaScript] = useState(initialJS);

  useEffect(() => {
    if (!!DeviceInfo && !!Platform) {
      const hasNotch = JSON.stringify(DeviceInfo.hasNotch());
      const operatingSystem = JSON.stringify(Platform.OS);

      setInjectedJavaScript(`
      localStorage.setItem("geobuff.device.hasNotch", ${hasNotch});
      localStorage.setItem("geobuff.device.os", ${operatingSystem});
      document.body.style.backgroundColor = 'blue';
      true;
      `);
    }
  }, [DeviceInfo, Platform]);

  return (
    <View style={styles.flex}>
      <SafeStatusBar />
      <View style={styles.flex}>
        <WebView
          ref={ref => (webViewRef.current = ref)}
          originWhitelist={['*']}
          injectedJavaScript={injectedJavaScript}
          source={{ uri: WEBVIEW_URL }}
          onMessage={event => {
            alert(event.nativeEvent.data);
          }}
          cacheEnabled={false}
          cacheMode={'LOAD_NO_CACHE'}
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
