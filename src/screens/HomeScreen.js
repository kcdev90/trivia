
import React from 'react';
import {
   StyleSheet,
   Text,
   TouchableHighlight,
   Image,
   ImageBackground,
   View,
} from 'react-native';

export default class HomeScreen extends React.Component {
   render() {
      return (
         <View style={styles.container}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.welcome}> Welcome to Trivia! Test your knowledge on facts! </Text>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('QuizScreen')} underlayColor='#ffffff00'>
               <ImageBackground source={require('../assets/images/button-green.png')} style={styles.button}>
                  <Text style={styles.text}>
                     Take Quiz!
                  </Text>
               </ImageBackground>
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
   welcome: {
		fontSize: 24,
      fontFamily: 'kavoon',
	},
   button:{
      height: 50,
      width: 200,
      justifyContent: 'center',
      alignItems: 'center'
   },
});
