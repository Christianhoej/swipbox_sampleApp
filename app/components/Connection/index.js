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
    ToastAndroid
} from 'react-native';
import LockerManager from '../LockerManager'
import {PermissionsAndroid} from 'react-native';


async function requestPermissions() {
    try {
    //const granted = PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
        title: 'Cool Photo App Camera Permission',
        message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
        },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permssion Granted');
        LockerManager.startScan();
        return true;
    } else {
        console.log('Permission Rejected');
    }
    } catch (err) {
    console.warn(err);
    } 
    return false;
}

let uuid = '';

export default class Connection extends Component {
    static navigationOptions = {
        title: 'Connection Screen',
    };

    constructor() {
        super();
        this.onConnectPress = this.onConnectPress.bind(this);
        this.state = {
            isConnecting: false
        }


        if (requestPermissions()) {
            console.log('permission granted');
            //LockerManager.startScan();
        }
    }
    
    componentDidMount() {
        const eventEmitter = new NativeEventEmitter(NativeModules.LockerManager);
        eventEmitter.addListener('onConnectionStatusChanged', (event) => {
            this.setState({isConnecting: false});
            if (event.status === LockerManager.STATUS_DEVICE_CONNECTED) {
                console.log('connected');
                LockerManager.stopScan();
                this.props.navigation.navigate('Operation', {uid: event.uid});
            } else {
                console.log('connection failed');
                ToastAndroid.show('connection failed status code ' + event.status, ToastAndroid.SHORT);
            }
        })
    }

    onConnectPress() {
        console.log('pressed');

        uuid = this.textInputUUID._lastNativeText;

        if (uuid == null || uuid.length == 0) {
            ToastAndroid.show('Empty uuid', ToastAndroid.SHORT);
        } else {
            console.log(uuid);
            //LockerManager.startScan();
            this.setState({isConnecting: true});
            LockerManager.connect(uuid);
        }
    }

    render() {
        if (this.state.isConnecting) {
            return (
                <View style = {styles.container}>
                    <ProgressBarAndroid />
                    <Text>Connecting to Device</Text>
                </View>
            )
        } else {
           return (
                <View style = {styles.container}>     
                    <Text>SwipBox Sample App</Text>
                    <TextInput
                        style={{textAlign: 'center'}}
                        id="textInputUUID"
                        placeholder="Enter UUID to connect"
                        underlineColorAndroid="black"
                        multiline={true}
                        ref={input => this.textInputUUID = input}
                        value="00000000-4281-4e45-0039-50130000003c"
                    />
                    <Button
                        title="Connect"
                        onPress={this.onConnectPress}
                    /> 
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})