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
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Image,
    color
} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import LockerManager from './LockerManager';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';

//import { Icon } from 'react-native-elements'

/*
var startpunkt = null;
var destination = null;
*/
export default class Splash extends Component {

    static navigationOptions = {
        headerShown: false,
        //title: '',
       // textAlign: 'center',
        //headerLeft: null,
         //   headerTitleAlign: 'center',
        //alignItems: 'center',
          //    justifyContent: 'center',

    };
/*
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Book pakke',
            headerLeft: null,

        }
    };
*/
    constructor(props) {
        super(props);
       /* this.state = {
            isLoaded: false,
             wasShown: false
        }*/



    }

    componentDidMount(){

    setTimeout(() => {


     try {
       AsyncStorage.getItem('key') // get key
            .then(wasShown => {
                if(wasShown === null) { // first time
                  // we need to save key for the next time
                  AsyncStorage.setItem('key', '"true"')
                  this.props.navigation.replace('Login')
                }
                else {
                this.props.navigation.replace('Home')}

                this.setState({isLoaded: true, wasShown})

             })
      } catch (e) {
             // saving error
           }
   },3000);
    }

    render() {
        return (
           <ScrollView
                     contentInsetAdjustmentBehavior="automatic"
                     style={styles.scrollView}>
                     <View style={styles.imageContainer}>
                         <Image style={{height: 50, width:200, justifyContent: 'center', alignItems: 'center'}}

                                   //source={{uri:'https://i.ibb.co/RcG9GNy/Crowd-Ship-logo.png'}}
                                   source={{uri:'https://imgur.com/9tdBDG0.png'}}
                                   //[url=https://[/img][/url]
                                   //source={{uri:'https://reactnative.dev/img/tiny_logo.png'}}
                                 />


                    </View>
                <View style={styles.imageContainer}>
                     <LottieView
                      style={{justifyContent: 'center', alignContent: 'center', height: 250
                      }}
                              source={require('../files/train_blue.json')}
                              autoPlay
                              loop

                        />
                </View>

            <View style={styles.imageContainer}>
                 <Image style={{height: 60, width: 220, justifyContent: 'center', alignItems: 'center', marginTop: 80}}

                           //source={{uri:'https://i.ibb.co/RcG9GNy/Crowd-Ship-logo.png'}}
                           source={{uri:'https://imgur.com/MgYZG17.png'}}
                           //source={require('../files/loger_samlet.png')}
                           //[url=https://[/img][/url]
                           //source={{uri:'https://reactnative.dev/img/tiny_logo.png'}}
                 />


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
    submit:{
        borderRadius: 100/ 2,
        backgroundColor:'#fff',
        borderRadius:200,
        borderWidth: 5,
        borderColor: '#00a3da'
      },
      submitText:{
          color:'#00a3da',
          textAlign:'center',
          fontWeight: '900'
      },
    test: {
        marginTop: 16,
        backgroundColor: 'black'
    },

  scrollView: {
      //backgroundColor: '#dae5f1',
      backgroundColor: '#fff',
      flex: 1
    },
    myButton:{
        padding: 5,
        height: 200,
        width: 200,  //The Width must be the same as the height
        borderRadius:400, //Then Make the Border Radius twice the size of width or Height
        //backgroundColor: '#00a3da',
        color: '#00a3da'

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
    imageContainer: {
          marginTop: 32,
          paddingHorizontal: 24,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: 'black',
      textAlign: 'left'
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
height:128,
    width: 128,
        fontSize: 40,
borderRadius: 100/ 2,
    backgroundColor: 'black'},

});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 24,

    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon

    fontSize: 24,
          fontWeight: '600',
          color: 'black',
          textAlign: 'left'
  },
  inputAndroid: {
    fontSize: 24,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  }

});