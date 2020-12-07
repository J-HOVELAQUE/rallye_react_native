import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';
import { Left, Right, Icon } from 'native-base';

import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';
import TeamScreen from './Team';
import Login from './Login';
import MediaScreen from './MediaScreen';
import ClassementScreen from './Classement';
import ProgrammeScreen from './ProgrammeScreen';
import ProfilScreen from './ProfilScreen';
import MenuScreen from './MenuScreen'



var BottomNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Team: TeamScreen,
    Classement: ClassementScreen,
    Map: MapScreen,
    Menu: MenuScreen,
    // Login: {screen: Login, tabBarOptions: {showLabel: true, showIcon: true}}
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
  },
  {
    initialRouteName: HebergementScreen
  }
);

const MyDrawerNavigator = createDrawerNavigator(
  {
    MapBurger: BottomNavigator,
    Home: HomeScreen,
    Team: TeamScreen,
    Classement: ClassementScreen,
    Map: MapScreen,
    Login:Login,
    Media:MediaScreen,
    Hebergement:HebergementScreen,
    Programme:ProgrammeScreen,
    Profil:ProfilScreen
  }
);


const MyApp = createAppContainer(MyDrawerNavigator);



export default function HebergementScreen() {
  return (
    // <View style={{ flex: 1, backgroundColor:'#e67e22', alignItems: "center",justifyContent: "center"}}><Text>Classement</Text> 
    // </View>
    <MyApp />
  );
}