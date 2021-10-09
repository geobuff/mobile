import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import {WebView} from 'react-native-webview';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const SafeStatusBar = () => (
    <SafeAreaView>
      <StatusBar translucent backgroundColor="white" />
    </SafeAreaView>
  );

  return (
    <View style={styles.container}>
      <SafeStatusBar />
      <View style={styles.content}>
        <WebView
          originWhitelist={['*']}
          source={{uri: 'https://geobuff.com/quiz/us-states'}}
        />
      </View>
    </View>
  );
};

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    backgroundColor: '#79B45D',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});

export default App;
