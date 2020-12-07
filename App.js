import React from 'react';
import { View } from 'react-native';

import {createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import TeamScreen from './screens/Team';
import ClassementScreen from './screens/Classement';
import Login from './screens/Login';

var BottomNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Team: TeamScreen,
    Classement: ClassementScreen,
    Map: MapScreen,
    Menu: MapScreen,
    

  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        var iconName;
        if (navigation.state.routeName == 'Home') {
          iconName = 'ios-home';
        } else if (navigation.state.routeName == 'Team') {
          iconName = 'ios-car';
        }else if (navigation.state.routeName == 'Classement') {
          iconName = 'ios-trophy';
        }else if (navigation.state.routeName == 'Map') {
          iconName = 'ios-map';
        }else if (navigation.state.routeName == 'Menu') {
          iconName="ios-menu";
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'white',
      style: {
        backgroundColor: '#313131',
      }
    },
  }
);

var Navigation = createAppContainer(BottomNavigator);
export default Navigation;