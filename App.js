/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import {
   BackHandler,
   ToastAndroid,
 } from 'react-native';

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
import Hello from './app/components/Hello';

const RootStack = createStackNavigator({
    Connection: Connection,
    Operation: Operation,
    Pickup: Pickup,
    Closing: Closing,
    Finish: Finish,
    Deliver: Deliver,
    Test: TestFunctions,
    Home: Home,


  },
  {
    initialRouteName: 'Home',
  },
);

var backPressedOnce = false;

BackHandler.addEventListener('hardwareBackPress', function() {
  // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
  // Typically you would use the navigator here to go to the last state.

  if (backPressedOnce==true) {

//    BackHandler.exitApp()
    return false;
  }
  else {

    backPressedOnce = true
    ToastAndroid.show('Tryk tilbage igen for at lukke appen', ToastAndroid.SHORT);

    setTimeout(function(){
                  backPressedOnce=false}, 2000);
    return true
    }
});

const MyTheme = {
  dark: false,
  colors: {
    primary: '#00a3da',
    background: '#dae5f1',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: '#00a3da',
  },
};

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer/>;
  }
}



