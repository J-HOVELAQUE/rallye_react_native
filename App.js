import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import TeamScreen from './screens/Team';
import ClassementScreen from './screens/Classement';
import Login from './screens/Login';
import Header from './Header'

import userConnected from './reducers/userConnected';

const store = createStore(combineReducers({ userConnected }));

var BottomNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen, navigationOptions: { headerTitle: () => <Header /> } },
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
        } else if (navigation.state.routeName == 'Classement') {
          iconName = 'ios-trophy';
        } else if (navigation.state.routeName == 'Map') {
          iconName = 'ios-map';
        } else if (navigation.state.routeName == 'Menu') {
          iconName = "ios-menu";
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

const MyDrawerNavigator = createDrawerNavigator(
  {
    MapBurger: BottomNavigator,
    Home: HomeScreen,
    Team: TeamScreen,
    Classement: ClassementScreen,
    Map: MapScreen,
    Login: Login
  },
  {
    drawerPosition: "right",
    drawerType: "front",
    drawerWidth: "100%"
  }
);




const MyApp = createAppContainer(MyDrawerNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <MyApp />
    </Provider>
  )
}
