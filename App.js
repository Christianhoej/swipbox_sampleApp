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


const RootStack = createStackNavigator({
    Connection: Connection,
    Operation: Operation
  },
  {
    initialRouteName: 'Connection',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
