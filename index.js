/**
 * @format
 */

import { AppRegistry, StatusBar } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

StatusBar.setBarStyle('dark-content');

AppRegistry.registerComponent(appName, () => App);
