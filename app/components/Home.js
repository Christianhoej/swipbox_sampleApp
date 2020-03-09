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



let stations = [
  {label: 'Nørreport',
    value: 'nørreport'
    },
  {label: 'Hovedbanegården',
   value: 'hovedbanegården'
   },
  {label: 'Lyngby',
    value: 'lyngby'
    },
];

var startpunkt = null;
var destination = null;

export default class Home extends Component {

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

                  <View style = {styles.sectionContainer}>
                   <Button
                   //style={styles.myButton}
                    title='Reserver pakke'
                    color = '#00a3da'

                       onPress={() => {
                           if(startpunkt==null || destination==null || startpunkt==destination)
                               alert('Indtast venligst både Startpunkt og Destination. Bemærk disse må ikke være ens')
                           else
                               this.props.navigation.replace('Pickup', {startpunktVal: startpunkt, destinationVal: destination})}
                       }>
                       /*<Text style={{justifyContent: 'center', textAlign:'center', alignItems: 'center'}}>
                       Hello
                       </Text>*/
                     </Button>
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
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:20,
        paddingBottom:20,
        backgroundColor:'#fff',
        borderRadius:20,
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
      backgroundColor: '#dae5f1',
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