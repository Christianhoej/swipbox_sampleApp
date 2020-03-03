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
        title: 'Book pakke',
        headerLeft: null,
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
                       <View style={styles.sectionContainer}>
                         <Text style={styles.sectionTitle}>Vælg startpunkt</Text>
                         < RNPickerSelect
                             onValueChange={(value) => {startpunkt=value, console.log(startpunkt) }}
                             style={pickerSelectStyles}

                             items={stations}
                             placeholder={ {label: 'Vælg station', value: null, color: '#9EA0A4' }}
                         />
                       </View>
                       <View style={styles.sectionContainer}>
                         <Text style={styles.sectionTitle}>Vælg destination</Text>
                         <RNPickerSelect
                               onValueChange={(value) => {destination=value, console.log(destination) }}
                               style={pickerSelectStyles}

                               items={stations}
                               placeholder={ {label: 'Vælg station', value: null, color: '#9EA0A4'}}
                           />
                       </View>

                  <View style = {styles.sectionContainer}>
                   <Button
                       title="OK"
                       onPress={() => {
                           if(startpunkt==null || destination==null || startpunkt==destination)
                               alert('Indtast venligst både Startpunkt og Destination. Bemærk disse må ikke være ens')
                           else
                               this.props.navigation.replace('Pickup', {startpunktVal: startpunkt, destinationVal: destination})}
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
    test: {
        marginTop: 16,
        backgroundColor: 'black'
    },
sectionContainer: {
      marginTop: 32,
  },
  scrollView: {
      backgroundColor: 'white',
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
      color: 'black',
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        marginTop: 100,
        fontSize: 40,
        fontWeight: "400"
    },

});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  }

});