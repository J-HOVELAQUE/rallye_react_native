import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { Text } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import TeamScreen from './screens/Team';
import ClassementScreen from './screens/Classement';
import LoginScreen from './screens/Login';
import MediaScreen from './screens/MediaScreen';
import HebergementScreen from './screens/HebergementScreen';
import ProgrammeScreen from './screens/ProgrammeScreen';
import ProfilScreen from './screens/ProfilScreen';
import MenuScreen from './screens/MenuScreen';
import LibraryScreen from './screens/LibraryScreen';

import userConnected from './reducers/userConnected';

// Fonts
import { AppLoading } from 'expo';
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from '@expo-google-fonts/roboto';

const store = createStore(combineReducers({ userConnected }));

var BottomNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Team: TeamScreen,
    Classement: ClassementScreen,
    Map: MapScreen,
    Menu: MenuScreen,

  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        var iconName;
        if (navigation.state.routeName === 'Home') {
          iconName = 'ios-home';
        } else if (navigation.state.routeName === 'Team') {
          iconName = 'ios-car';
        } else if (navigation.state.routeName === 'Classement') {
          iconName = 'ios-trophy';
        } else if (navigation.state.routeName === 'Map') {
          iconName = 'ios-map';
        } else if (navigation.state.routeName === 'Menu') {
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
    Login: LoginScreen,
    Media: MediaScreen,
    Hebergement: HebergementScreen,
    Programme: ProgrammeScreen,
    Profil: ProfilScreen,
    Librairie: LibraryScreen
  }
);


const MyApp = createAppContainer(MyDrawerNavigator);

export default function App() {
  let [fontsLoaded, error] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

    return (
      <Provider store={store}>
        <MyApp />
      </Provider>
    )
  }
}
