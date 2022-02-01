import React, { useEffect, useRef, useState } from 'react';
import { WEBVIEW_URL } from '@env';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import DeviceInfo from 'react-native-device-info';

import { WebView } from 'react-native-webview';

const initialJS = `
true;
`;

const isAndroid = Platform.OS === 'android';

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
      true;
      `);
    }
  }, [DeviceInfo, Platform]);

  console.log(injectedJavaScript, 'injectedJS');

  return (
    <View style={styles.flex}>
      <SafeStatusBar />
      <View style={styles.flex}>
        <WebView
          ref={ref => (webViewRef.current = ref)}
          originWhitelist={['*']}
          injectedJavaScriptBeforeContentLoaded={injectedJavaScript}
          source={{ uri: WEBVIEW_URL }}
          cacheEnabled={false}
          cacheMode={'LOAD_NO_CACHE'}
          decelerationRate="normal"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    marginTop: isAndroid ? 12 : undefined,
  },
});

export default App;
