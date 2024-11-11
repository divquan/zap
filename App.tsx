import React from 'react';
import MainTabNavigator from './app/navigators/MainTabNavigator';
import {NavigationContainer} from '@react-navigation/native';

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
}

export default App;
