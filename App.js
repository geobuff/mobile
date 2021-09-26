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
  const SafeStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, {backgroundColor}]}>
      <SafeAreaView>
        <StatusBar backgroundColor={backgroundColor} />
      </SafeAreaView>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeStatusBar backgroundColor="white" />
      <View style={styles.content}>
        <WebView
          originWhitelist={['*']}
          source={{uri: 'https://geobuff.com'}}
        />
      </View>
    </View>
  );
};

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
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
