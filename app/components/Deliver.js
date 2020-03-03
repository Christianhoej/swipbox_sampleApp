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



export default class Deliver extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Deliver',
            headerLeft: null,

        }
    };

    constructor(props) {
        super(props);
        closingVar = 'fromDeliver';
        destinationVal = this.props.navigation.getParam('destinationVal','');


    }

    render() {
        return (
           <ScrollView
                   contentInsetAdjustmentBehavior="automatic"
                   style={styles.scrollView}>
                     <View style={styles.sectionContainer}>
                       <Text style={styles.sectionTitle}>Aflever din pakke på {destinationVal}</Text>

                     </View>

                     <View style = {styles.button}>
                             <Button
                                 title="Åben"
                                 onPress={() => this.props.navigation.replace('Closing', {closingVar1: closingVar})}

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