import React, {Component} from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    Button,
    NativeEventEmitter,
    NativeModules,
    BackHandler,
    ToastAndroid
} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import LockerManager from './LockerManager';



export default class Closing extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Closing',
            headerLeft: null,

        }
    };

    constructor(props) {
        super(props);


    }

    render() {
        return (
            <Button
                                               title="Annuller"

                                               onPress={() => this.props.navigation.navigate('Closing')}
                                               />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    test: {
        marginTop: 16,
        backgroundColor: 'black'
    }
})