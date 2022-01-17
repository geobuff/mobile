import React, { useEffect } from 'react';
import { WEBVIEW_URL } from '@env';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { WebView } from 'react-native-webview';

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
