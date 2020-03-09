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
    BackHandler,
    ScrollView
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import LockerManager from './LockerManager'
import {PermissionsAndroid} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import CountDown from 'react-native-countdown-component';



let UUID = '';
let isAuthenticated = false;

let errorListener;
let tokenAvailableListener;
let statusAvailableListener;
let connectionStatusChangedListener;
let compartmentStatusChangedListener;
let authenticationStatusChangedListener;

let apiErrorListener;
let apiDataAvailable;

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
//var { startpunktVal } = route.params;
    //var { destinationVal } = route.params;


export default class Deliver extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            //title: 'Deliver',
            //headerLeft: null,
            headerShown: false,
        }
    };


    constructor(props) {
        super(props);
        this.onConnectPress = this.onConnectPress.bind(this);
        this.getData = this.getData.bind(this);
        this.onDisconnect = this.onDisconnect.bind(this);
        //this.handleOnBackPress = this.handleOnBackPress.bind(this);
        this.onAuthenticatePress = this.onAuthenticatePress.bind(this);
        this.onCompartmentOpenPress = this.onCompartmentOpenPress.bind(this);

        this.state = {
            isConnecting: false,
            loadingData: false,
            token: '',
            authenticationToken: '',
            authenticationResponse: ''
        }


        if (requestPermissions()) {
            console.log('permission granted');
            LockerManager.startScan();
        }

//TODO: UUID from start and destination
            UUID = "00000000-4462-4E45-0028-901000000042";
            closingVar = 'fromDeliver';
            destinationVal = this.props.navigation.getParam('destinationVal','');


//        this.onDisconnect();
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');

        apiErrorListener.remove();
        apiDataAvailable.remove();

        errorListener.remove();
        tokenAvailableListener.remove();
        statusAvailableListener.remove();
        connectionStatusChangedListener.remove();
        compartmentStatusChangedListener.remove();
        authenticationStatusChangedListener.remove();
        //BackHandler.removeEventListener("hardwareBackPress", this.handleOnBackPress);
    }

    componentDidMount() {
        console.log('componentDidMount');

        const eventEmitter = new NativeEventEmitter(NativeModules.LockerManager);

        connectionStatusChangedListener = eventEmitter.addListener('onConnectionStatusChanged', (event) => {
                    console.log('EVENT-connectionStatusChangedListener')

            console.log('uid: ' + event.uid + ', status: ' + event.status);
//Her
            this.setState({isConnecting: false});
            if (event.status === LockerManager.STATUS_DEVICE_CONNECTED) {
            console.log('connected');
            LockerManager.stopScan();

            //setTimeout(this.getData(), 6000)
            //setTimeout(function(){this.getData()} , 10000)
            //this.getData();
            /*if(event.uid)
            this.onAuthenticatePress();*/
            this.getData()
            } else {
            console.log('connection failed');
            ToastAndroid.show('connection failed status code ' + event.status, ToastAndroid.SHORT);
            }
//Til her
            if (event.status === LockerManager.STATUS_DEVICE_TIME_OUT) {
                console.log('Device timeout');
                ToastAndroid.show("Deice timeout", ToastAndroid.LONG);
                LockerManager.startScan();
            } else if (event.status === LockerManager.STATUS_DEVICE_OUT_OF_RANGE) {
                console.log('Device out of range');
                ToastAndroid.show("Device out of range", ToastAndroid.LONG);
                LockerManager.startScan();
            }
        });

            authenticationStatusChangedListener = eventEmitter.addListener('onAuthenticationStatusChanged', (event) => {
            console.log('EVENT-authenticationStatusChangedListener');

                    console.log('uid: ' + event.uid + ', isAuthenticated: ' + event.isAuthenticated);
                    isAuthenticated = event.isAuthenticated;
                    ToastAndroid.show(isAuthenticated ? "Authenticated" : "Authentication failed", ToastAndroid.LONG);
                    if(isAuthenticated){
                    this.onCompartmentOpenPress()}
                });

            compartmentStatusChangedListener= eventEmitter.addListener('onCompartmentStatusChanged', (event) => {
                    console.log('EVENT-compartmentStatusChangedListener');
                    console.log('uid: ' + event.uid + ', compartmentId: ' + event.compartmentId + ', compartmentState: ' + event.compartmentState);
                    ToastAndroid.show("Compartment id " + event.compartmentId + (event.compartmentState == 1 ? " opened" : " closed"), ToastAndroid.LONG);
                    if(event.compartmentState == 1){
                    this.props.navigation.replace('Closing',  {closingVar1: closingVar})
                    }
                });

            statusAvailableListener = eventEmitter.addListener('onStatusAvailable', (event) => {
                    console.log('EVENT-statusAvailableListener');

                    console.log('uid: ' + event.uid + ', status: ' + event.status);
                    //ToastAndroid.show(event.status, ToastAndroid.LONG);
                    //this.onAuthenticatePress()
                });

            tokenAvailableListener = eventEmitter.addListener('onTokenAvailable', (event) => {
            console.log('EVENT-tokenAvailableListener')
                    console.log('uid: ' + event.uid + ', token: ' + event.token);
                    ToastAndroid.show(event.token, ToastAndroid.LONG);
                    //this.onAuthenticatePress()
                });

            errorListener = eventEmitter.addListener('onError', (event) => {
            console.log('EVENT-errorListener')
                    console.log('uid: ' + event.uid + ', errorCode: ' + event.errorCode);
                    ToastAndroid.show("Error Code: " + event.errorCode, ToastAndroid.LONG);
                });


            apiErrorListener = eventEmitter.addListener('onApiError', (event) => {
            console.log('EVENT-apiErrorListener')
                    this.setState({loadingData: false});

                    console.log('API: errorCode: ' + event.errorCode);
                    ToastAndroid.show("Error Code: " + event.errorCode, ToastAndroid.LONG);
                });

            apiDataAvailable = eventEmitter.addListener('onApiDataAvailable', (event) => {
            console.log('EVENT-apiDataAvailable')
                    this.setState({
                        loadingData: false,
                        token: event.token,
                        authenticationToken: event.authenticationToken,
                        authenticationResponse: event.authenticationResponse
                    //this.onAuthenticatePress();

                    });

                    console.log('API TOKEN: ' + event.token);
                    console.log('API AUTHENTICATION: ' + event.authenticationToken);
                    console.log('API AUTHENTICATION RESPONSE: ' + event.authenticationResponse);

                    this.onAuthenticatePress();

                });
    }

    onConnectPress() {
        //this.onDisconnect();
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

        getData() {
        setTimeout(function(){
            LockerManager.getData(UUID);
            /*this.setState({
                    loadingData: !this.state.loadingData
                });*/
        } , 10000)
        }

        onAuthenticatePress() {
            LockerManager.authenticate(
                UUID,
                this.state.authenticationToken,
                this.state.authenticationResponse
            );
        }

        onCompartmentOpenPress() {
            LockerManager.openCompartment(
                UUID,
                this.state.token
            );
        }

        onDisconnect() {
            LockerManager.startScan();
            LockerManager.disconnect(UUID);
        }

        toClosing() {
            this.props.navigation.replace('Closing')
        }

    render() {
       return (
       <ScrollView
               contentInsetAdjustmentBehavior="automatic"
               >
                     <View style={styles.butttonContainer}>

                           <View style = {styles.button2}>
                                <Button
                                     title="Forbind"
                                     //  onPress={this.onConnectPress}
                                     //onPress={() => navigation.replace('Closing', {closingVar1: closingVar, destination: destinationVal})}
                                     //onPress={() => this.onConnectPress()}
                                     onPress={this.onConnectPress}
                                     />
                                </View>
                             <View style = {styles.button2}>
                              <Button
                                  title="Åben"
                                  //  onPress={this.onConnectPress}
                                  onPress={() => this.props.navigation.replace('Closing', {closingVar1: closingVar, destination: destinationVal})}
                                  //onPress={() => this.onConnectPress()}
                                  //onPress={console.log("DELIVER_OPEN"), this.getData}
                                  />
                              </View>
                           </View>



        </ScrollView>
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
sectionContainer: {
      marginTop: 32,
  },
  scrollView: {
      backgroundColor: Colors.white,
    },
countdownStyle: {
      paddingHorizontal: 20,
      marginTop: 20
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: Colors.white,
    },
    butttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
      },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
      textAlign: 'center'
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.dark,
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
    button: {
        paddingHorizontal: 100,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        marginTop: 60,
        fontSize: 40,
        fontWeight: "400"
    },
    button2: {
        width: '40%',
        height: 40,
        paddingHorizontal: 20
      },
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

});