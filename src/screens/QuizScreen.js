
import React from 'react';
import {
   ActivityIndicator,
   Animated,
   Dimensions,
   Easing,
   Image,
   ImageBackground,
   StyleSheet,
   Text,
   TouchableHighlight,
   View,
} from 'react-native';
import {Audio} from 'expo-av';

import {
   NUMBER_OF_QUESTIONS,
   SOURCE_URL,
} from '../constants/Constants'

const W = Dimensions.get('window').width
const H = Dimensions.get('window').height

let animatedValue = new Animated.Value(0)
const soundObject = new Audio.Sound()
const responseSounds = {
   correct: require('../assets/audio/correct.wav'),
   wrong: require('../assets/audio/wrong.wav'),
}

class AnimatableText extends React.Component {

   constructor(props) {
      super(props)
      this.state={
         fontSize: 1,
         isVisible: false,
      }
   }

}

export default class QuizScreen extends React.Component {

   constructor(props){
      super(props);
      this.state={
         isLoading: true,
         progress: 0,
         score: 0,
         showCorrectMessage: false,
         showWrongMessage: false,
      }
   }

   componentDidMount() {
		this.getQuizDataFromAPI()
      this.addSubscriptions()
	}

   componentWillUnmount() {
      this.focusListener.remove()
   }

   render() {

      if(this.state.isLoading){
			return(
				<View style={{flex: 1, padding: 20}}>
					<ActivityIndicator/>
				</View>
			)
		}

      return (
         <View style={styles.rootContainer}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            {true && <Text style={styles.progress}> Question {this.state.progress + 1}/{NUMBER_OF_QUESTIONS} </Text>}

            <Text style={styles.question}>
               {this.state.quizData[this.state.progress].question}
            </Text>

            <View style={styles.buttonsContainer}>
               <TouchableHighlight onPress={() => this.checkAnswer('False')} underlayColor='#ffffff00'>
                  <ImageBackground source={require('../assets/images/button-orange.png')} style={styles.button}>
                     <Text style={styles.buttonLabel}>
                        FALSE
                     </Text>
                  </ImageBackground>
               </TouchableHighlight>

               <TouchableHighlight onPress={() => this.checkAnswer('True')} underlayColor='#ffffff00'>
                  <ImageBackground source={require('../assets/images/button-blue.png')} style={styles.button}>
                     <Text style={styles.buttonLabel}>
                        TRUE
                     </Text>
                  </ImageBackground>
               </TouchableHighlight>
            </View>

            {this.state.showCorrectMessage && <Animated.Text style={[styles.anim, {color: 'green'}]}> Correct! </Animated.Text>}
            {this.state.showWrongMessage && <Animated.Text style={[styles.anim, {color: 'red'}]}> Wrong! </Animated.Text>}

         </View>
      );
   }

   getQuizDataFromAPI() {
		return fetch(SOURCE_URL)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					isLoading: false,
					quizData: responseJson.results,
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

   addSubscriptions() {
      this.focusListener = this.props.navigation.addListener('didFocus',
         () => {
            console.log('returned to home screen');
         }
      );
   }

   checkAnswer(answer) {

      nextQuestion = () => {
         if (this.state.progress + 1 < NUMBER_OF_QUESTIONS) {
            this.setState({
               progress: this.state.progress + 1,
               showCorrectMessage: false,
               showWrongMessage: false,
            })
         } else {
            this.props.navigation.navigate('GameOverScreen', {score: this.state.score})
         }
      }

      if (answer == this.state.quizData[this.state.progress].correct_answer) {
         this.handlePlaySound('correct')
         this.setState({showCorrectMessage: true})
         this.handleAnimation()
         this.setState({score: this.state.score + 1})
      } else {
         this.handlePlaySound('wrong')
         this.setState({showWrongMessage: true})
         this.handleAnimation()
      }
      setTimeout(function() {
         this.nextQuestion()
      }, 1000)

   }

   handleAnimation() {
      Animated.timing(animatedValue, {
           toValue: 1,
           duration: 250,
           easing: Easing.ease
      }).start(() => {
         // Animation Complete
         console.log('animation complete')
         // Animated.timing(animatedValue, {
         //    toValue: 0,
         //    duration: 1,
         //    easing: Easing.ease
         // })
      })
   }

   async handlePlaySound(answer) {
		try {
         let soundEffect = responseSounds[answer]
			await soundObject.loadAsync(soundEffect)
			await soundObject
				.playAsync()
				.then(async playbackStatus => {
					setTimeout(() => {
						soundObject.unloadAsync()
					}, playbackStatus.playableDurationMillis)
				})
				.catch(error => {
					console.log(error)
				})
		} catch (error) {
			console.log(error)
		}
	}

}

const styles = StyleSheet.create({
   rootContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
   logo: {
      width: 240,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
   },
   progress: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   question: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   buttonsContainer: {
      flexDirection: 'row',
      width: W,
      alignItems: 'center',
      justifyContent: 'space-around',
   },
   button:{
      height: 40,
      width: 160,
      justifyContent: 'center',
      alignItems: 'center'
   },
   buttonLabel: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   anim: {
      fontSize: 1,
      fontFamily: 'kavoon',
      transform:
      [
         {
            translateX: animatedValue.interpolate({
               inputRange : [0, 1],
               outputRange: [0, 1]
            })
         },
         {
            translateY: animatedValue.interpolate({
               inputRange : [0, 1],
               outputRange: [0, 1]
            })
         },
         {
            scaleX: animatedValue.interpolate({
               inputRange : [0, 1],
               outputRange: [1, 50]
            })
         },
         {
            scaleY: animatedValue.interpolate({
               inputRange : [0, 1],
               outputRange: [1, 50]
            })
         }
      ]
  }
});
