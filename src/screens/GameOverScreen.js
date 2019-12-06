
import React from 'react';
import {
   StyleSheet,
   Text,
   TouchableHighlight,
   Image,
   ImageBackground,
   View,
} from 'react-native';
import AnimateNumber from 'react-native-animate-number'
import { NUMBER_OF_QUESTIONS } from '../constants/Constants'

export default class HomeScreen extends React.Component {

   playAgain() {
      this.props.navigation.navigate('HomeScreen')
   }

   render() {
      return (
         <View style={styles.container}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.message}> Your final score is... </Text>
            <View style={styles.scoreContainer}>
               <AnimateNumber value={this.props.navigation.state.params.score} style = {styles.score} formatter = {(val) => {
                  return parseFloat(val).toFixed(0)
               }} />
               <Text style={styles.score}> /{NUMBER_OF_QUESTIONS} </Text>
            </View>
            <Text style={styles.message}> Play Again </Text>
            <TouchableHighlight onPress={() => this.playAgain()} underlayColor='#ffffff00'>
               <ImageBackground source={require('../assets/images/play-again.png')} style={styles.button} />
            </TouchableHighlight>
         </View>
      );
   }

}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
   logo: {
      width: 250,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
   },
   message: {
		fontSize: 24,
      fontFamily: 'kavoon',
	},
   scoreContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
   },
   score: {
      fontSize: 48,
      fontFamily: 'kavoon',
   },
   button: {
      width: 100,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
   },
});
