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
    ToastAndroid,
    ScrollView,
    ActivityIndicator,
    Image,
    ImageBackground,
    color
} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import LockerManager from './LockerManager';



export default class Closing extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            //title: 'Closing',
            //headerLeft: null,
            headerShown: false,

        }
    };

    constructor(props) {
        super(props);

        closingVar1 = this.props.navigation.getParam('closingVar1','');
        destination = this.props.navigation.getParam('destination','');

        UUID = "00000000-4462-4E45-0028-901000000042";
        text1 = 'TEXT'
        if (closingVar1=="fromPickup"){
                text1 = 'Tag din pakke og luk lågen efter dig'}
           else{
                text1 = 'Aflever din pakke og luk lågen efter dig'};



    }

    componentDidMount() {
            console.log('componentDidMount');


            const eventEmitter = new NativeEventEmitter(NativeModules.LockerManager);

                compartmentStatusChangedListener= eventEmitter.addListener('onCompartmentStatusChanged', (event) => {
                        console.log('EVENT-compartmentStatusChangedListener');
                        console.log('uid: ' + event.uid + ', compartmentId: ' + event.compartmentId + ', compartmentState: ' + event.compartmentState);
                        ToastAndroid.show("Compartment id " + event.compartmentId + (event.compartmentState == 1 ? " opened" : " closed"), ToastAndroid.LONG);
                        if(event.compartmentState == 0){


                        if (closingVar1=="fromPickup")
                               this.props.navigation.replace("Deliver", {destinationVal: destination})
                           else
                               this.props.navigation.replace("Finish")
                        }
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


        }
        onDisconnect() {
            LockerManager.startScan();
            LockerManager.disconnect(UUID);
        }



    render() {
        return (


          <ImageBackground
          source={{uri:'https://imgur.com/TcklwFa.png'}} style={{width: '100%', height: '100%'}}>






            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{text1}</Text>
              <Text style={styles.sectionDescription}></Text>

            </View>


              <View style={styles.sectionContainer}>
              <ActivityIndicator size="large" color="#00a3da" />
            </View>

            <View style = {styles.button}>
                    <Button
                        title="Meld lågen lukket"
                        color = '#00a3da'
                          onPress={() => {
                           if (closingVar1=="fromPickup")
                               this.props.navigation.replace("Deliver", {destinationVal: destination})
                           else
                               this.props.navigation.replace("Finish")
                           }

                          }


                      />
                    </View>



                  </ImageBackground>


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
    },
sectionContainer: {
      marginTop: 32,
  },
  backgroundImage: {
          flex: 1,
          width: null,
          height: null,
          resizeMode: 'cover'
      },
  scrollView: {
      backgroundColor: '#dae5f1',

    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: 'white',
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: 'white',
      textAlign: 'center'
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: 'white',
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: 'black',
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
    button: {
        paddingHorizontal: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        fontSize: 40,
        fontWeight: "400"
    },

});