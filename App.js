
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { View } from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';

export default function App(props) {
{/*constructor(props){
   super(props);
   this.state={isLoadingImage: true}
}*/}
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <AppNavigator />
      </View>
    );
  }
}

async function loadResourcesAsync() {
   await Font.loadAsync({
      'kavoon': require('./src/assets/fonts/Kavoon-Regular.ttf'),
   })
}

function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}
