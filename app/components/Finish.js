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
    Image,
    ActivityIndicator,
    color
} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import LockerManager from './LockerManager';
import LottieView from 'lottie-react-native';




export default class Finish extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            //title: 'Finish',
            //headerLeft: null,
            headerShown: false,

        }
    };

    constructor(props) {
        super(props);



    }

    componentDidMount() {
            console.log('componentDidMount');
           // this.animation.play();
    }

    render() {
        return (
           <ScrollView
                   contentInsetAdjustmentBehavior="automatic"
                   style={styles.scrollView}>
                     <View style={styles.sectionContainer}>
                       <Text style={styles.sectionTitle}>Tak for din hjælp!</Text>
                       <Text style={styles.sectionDescription}>Indtast din email nedenfor hvor du vil modtage din rabat</Text>


                     </View>




                 <LottieView
                      style = {styles.lottieStyle}

                              source={require('../files/checkmark.json')}
                              autoPlay loop
                            />




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

    },
    lottieStyle: {
        marginTop: 40,


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
        marginTop: 400,
        fontSize: 40,
        fontWeight: "400"
    },

});