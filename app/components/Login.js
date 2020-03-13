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
    TouchableOpacity,
    color
} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import LockerManager from './LockerManager';
import AsyncStorage from '@react-native-community/async-storage';

import { db } from '../config';

let addUser = user => {
  db.ref('/users').push({
    email: user
  });
};

export default class Login extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            //title: 'Closing',
            //headerLeft: null,
            headerShown: false,

        }
    };

    constructor(props) {
        super(props);
        this.state = {
                    isLoaded: false,
                     wasShown: false,

                };
        userEmail=null;
        userPassword=null;
    }

    componentDidMount() {
            console.log('componentDidMount');

       /*     AsyncStorage.getItem('key2') // get key
                        .then(wasShown => {
                            if(wasShown === null) { // first time
                              // we need to save key for the next time
                              AsyncStorage.setItem('key2', '"true"')
                            }

                            this.setState({isLoaded: true, wasShown})
                         })
                  } catch (e) {
                         console.log('LOGIN_ERROR')
                       }
        */
    }

    validate = (text) => {
      console.log(text);
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(text) === false) {
        console.log("Email is Not Correct");
        alert('Indtasten gyldig email')
        return false;
      }
      else {
        this.props.navigation.replace('Home')}
        console.log("Email is Correct");
        addUser(text);
      }



    render() {
        return (

            <ScrollView
               contentInsetAdjustmentBehavior="automatic"
               style={styles.scrollView}>


                   <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Tilmelding</Text>
                        <Text style={styles.sectionDescription}>Tilmeld dig Crowdship ved at indtaste din email herunder</Text>
                        <Text style={styles.sectionDescription}></Text>

                       <TextInput
                             style={styles.textinputStyle}
                             placeholder="Email"
                             textContentType="emailAddress"
                             onChangeText={(value) => userEmail=value}
                             //value={value}
                           />


                 </View>
                 <View style = {styles.imageContainer}>
                     <TouchableOpacity onPress={() => {
                     this.validate(userEmail)
                     /*if(userEmail==null){
                        alert('Indtasten gyldig email')}
                     else{
                             this.props.navigation.replace('Home')}*/
                             }
                      }>
                         <Image
                             style={{width: 150, height: 150}}
                             source={{uri:'https://i.ibb.co/k6C2KMJ/tilmeld.png'}}
                         />
                         </TouchableOpacity>
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
    imageContainer: {
              marginTop: 32,

              alignItems: 'center',
            },
    test: {
        marginTop: 16,
        backgroundColor: 'black'
    },
    textinputStyle: {
        height: 40,
        borderColor: '#00a3da',
        borderWidth: 2,
        marginTop: 30,
        textAlign: 'center',
        borderRadius: 20,

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
      backgroundColor: '#fff',

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
      color:'#00a3da',
      textAlign: 'center'
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      color: '#00a3da',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
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