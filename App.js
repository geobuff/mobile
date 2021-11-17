import React, { useEffect } from 'react';
import { WEBVIEW_URL } from '@env';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { WebView } from 'react-native-webview';

const isAndroid = Platform.OS === 'android';

const INJECTEDJAVASCRIPT =
  "const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=0.99, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); ";

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const SafeStatusBar = () => (
    <SafeAreaView>
      <StatusBar translucent backgroundColor="white" barStyle="dark-content" />
    </SafeAreaView>
  );

  return (
    <View style={styles.flex}>
      <SafeStatusBar />
      <View style={styles.flex}>
        <WebView
          originWhitelist={['*']}
          source={{ uri: WEBVIEW_URL }}
          scrollEnabled={isAndroid ? false : true}
          injectedJavaScript={isAndroid ? INJECTEDJAVASCRIPT : undefined}
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
