import React, {Component} from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    Button,
    ProgressBarAndroid,
    NativeEventEmitter,
    NativeModules,
    ToastAndroid,
    Colors,
    BackHandler,
    ScrollView
} from 'react-native';
import LockerManager from './LockerManager'
import {PermissionsAndroid} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';

export default class Closing extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Closing',
        }
    };
}