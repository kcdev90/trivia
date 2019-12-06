
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen'
import QuizScreen from '../screens/QuizScreen'
import GameOverScreen from '../screens/GameOverScreen'

export default createAppContainer(
   createSwitchNavigator(
      {
         HomeScreen: { screen: HomeScreen },
         QuizScreen: { screen: QuizScreen },
         GameOverScreen: { screen: GameOverScreen },
      },
      {
         headerMode: 'none',
         navigationOptions: {
            headerVisible: false,
         }
      }
   )
);
