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
import AsyncStorage from '@react-native-community/async-storage';



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
                     wasShown: false
                }

    }

    componentDidMount() {
            console.log('componentDidMount');
    try {


       AsyncStorage.getItem('key2') // get key
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
    }



    render() {
        return (

            <ScrollView
               contentInsetAdjustmentBehavior="automatic"
               style={styles.scrollView}>


                   <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Opret bruger</Text>
                       <TextInput
                             style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                             onChangeText={text => onChangeText(text)}
                             //value={value}
                           />
                       <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => onChangeText(text)}
                            //value={value}
                          />
                 </View>
                 <View style = {styles.button}>
                         <Button
                             title="Afslut"
                               onPress={() => {this.props.navigation.replace('Home')}}
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