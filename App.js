/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Connection from './app/components/Connection';
import Operation from './app/components/Operation';
import TestFunctions from './app/components/TestFunctions';
import Home from './app/components/Home';
import Pickup from './app/components/Pickup';
import Deliver from './app/components/Deliver';
import Closing from './app/components/Closing';
import Finish from './app/components/Finish';

const RootStack = createStackNavigator({
    Connection: Connection,
    Operation: Operation,
    Pickup: Pickup,
    Closing: Closing,
    Finish: Finish,
    Deliver: Deliver,
    Test: TestFunctions,
    Home: Home

  },
  {
    initialRouteName: 'Operation',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
