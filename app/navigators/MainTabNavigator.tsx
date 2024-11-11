import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import React from 'react';
import RecieveScreen from '../screens/RecieveScreen';
import SendScreen from '../screens/SendScreen';
import SettingsScreen from '../screens/SettingsScreen';

function MainTabNavigator() {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Send" component={SendScreen} />
      <Tab.Screen name="Recieve" component={RecieveScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
export default MainTabNavigator;
