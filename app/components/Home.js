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

//import { addItem } from '../services/ItemService';

//import { Icon } from 'react-native-elements'



let stations = [
    {label: 'Amagerbro Torv',
        value: 'Amagerbro Torv'},

    {label: 'DTU – Anker Engelunds vej',
        value: 'DTU – Anker Engelunds vej'},

    {label: 'DTU – Rævehøj',
        value: 'DTU – Rævehøj'},

    {label: 'Flintholm Station',
        value: 'Flintholm Station'},

    {label: 'Glostrup',
        value: 'Glostrup'},

    {label: 'Hellerup Station',
        value: 'Hellerup Station'},

    {label: 'Hillerød Station',
        value: 'Hillerød Station'},

    {label: 'Høje Taastrup Station',
        value: 'Høje Taastrup Station'},

    {label: 'Islands Brygge',
        value: 'Islands Brygge'},

    {label: 'Jyllinge',
        value: 'Jyllinge'},

    {label: 'Køge Station',
        value: 'Køge Station'},

    {label: 'Ny Ellebjerg',
        value: 'Ny Ellebjerg'},

    {label: 'Nørrebro Station',
        value: 'Nørrebro Station'},

    {label: 'Nørreport Station',
        value: 'Nørreport Station'},

    {label: 'Roskilde Station',
        value: 'Roskilde Station'},

    {label: 'Ryparken Station',
        value: 'Ryparken Station'},

    {label: 'Valby Station',
        value: 'Valby Station'},

    {label: 'Vanløse Torv',
        value: 'Vanløse Torv'},

    {label: 'Vestamager Station',
        value: 'Vestamager Station'},

    {label: 'Vindinge',
        value: 'Vindinge'},

    {label: 'Ørestad Station',
        value: 'Ørestad Station'},

    {label: 'Østerport Station',
        value: 'Østerport Station'},
];

export default class Home extends Component {

static navigationOptions = ({navigation}) => {
        return {

        headerShown: false,
        //title: '',
       // textAlign: 'center',
        //headerLeft: null,
         //   headerTitleAlign: 'center',
        //alignItems: 'center',
          //    justifyContent: 'center',

        }
    };

    constructor(props) {
        super(props);
       /* this.state = {
            isLoaded: false,
             wasShown: false
        }*/
        startpunkt = null;
        destination = null;


    }

    componentDidMount(){
    console.log('HOMEcomponentDidMount')

     try {
            AsyncStorage.setItem('TESTVALUE', '3333')
            console.log('settestvalue')

      } catch (e) {
             console.log('Home async error')
           }
    }

    render() {
        return (
           <ScrollView
                     contentInsetAdjustmentBehavior="automatic"
                     style={styles.scrollView}>
                     <View style={styles.imageContainer}>
                         <Image style={{width: 200, height: 50, justifyContent: 'center', alignItems: 'center'}}

                                   //source={{uri:'https://i.ibb.co/RcG9GNy/Crowd-Ship-logo.png'}}
                                   source={{uri:'https://imgur.com/9tdBDG0.png'}}
                                   //[url=https://[/img][/url]
                                   //source={{uri:'https://reactnative.dev/img/tiny_logo.png'}}
                                 />


                    </View>
                       <View style={styles.sectionContainer}>
                         <Text style={styles.sectionTitle}>Fra</Text>
                         < RNPickerSelect
                             onValueChange={(value) => {startpunkt=value, console.log(startpunkt) }}
                             style={pickerSelectStyles}

                             items={stations}
                             placeholder={ {label: 'Vælg startpunkt', value: null, color: '#9EA0A4' }}
                         />
                       </View>
                       <View style={styles.sectionContainer}>
                         <Text style={styles.sectionTitle}>Til</Text>
                         <RNPickerSelect
                               onValueChange={(value) => {destination=value, console.log(destination) }}
                               style={pickerSelectStyles}

                               items={stations}
                               placeholder={ {label: 'Vælg destination', value: null, color: '#9EA0A4'}}
                           />
                       </View>




<View style = {styles.imageContainer}>
    <TouchableOpacity onPress={() => {
         if(startpunkt==null || destination==null || startpunkt==destination)
             alert('Indtast venligst både Startpunkt og Destination. Bemærk disse må ikke være ens')
         else {
             this.props.navigation.replace('Pickup', {startpunktVal: startpunkt, destinationVal: destination})
             console.log('navigatetopickup')
            try {
                console.log('try to get TESTVALUE')
                        let asyncval = AsyncStorage.getItem('TESTVALUE')
                        if (asyncval !== null){
                        console.log(asyncval)
                        console.log('asyncval FOUND')}
                        else {
                        console.log('asyncval error 2')}

                  } catch (e) {
                         console.log('Pickup replace async error')
                       }
           }
           }
     }>
        <Image
            style={{width: 150, height: 150}}
            source={{uri:'https://i.ibb.co/r3fGFrR/reserver.png'}}

        />
        </TouchableOpacity>


        <Button
        title="Finish"
        onPress={() => {

                     this.props.navigation.replace('Finish', {startpunktVal: startpunkt, destinationVal: destination})}
             }
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