import React, { useEffect, useState } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { AsyncStorage, Text } from 'react-native';



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
import TeamPilot from './screens/TeamPilot';
import LibraryScreen from './screens/LibraryScreen';
import MonCompte from './screens/MonCompte';

import NewsScreen from './screens/NewsScreen';

import userConnected from './reducers/userConnected';
import userFavorites from './reducers/userFavorites';

// Fonts
import { AppLoading } from 'expo';
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_900Black,
} from '@expo-google-fonts/roboto';
import { greyDarkTa, redTa, whiteTa } from './components/rallye-lib';

const store = createStore(combineReducers({ userConnected, userFavorites }));
const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.9:3000';

var BottomNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Teams: TeamScreen,
    Classement: ClassementScreen,
    Map: MapScreen,
    Medias: MediaScreen,

  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        var iconName;
        if (navigation.state.routeName === 'Home') {
          iconName = 'ios-home';
        } else if (navigation.state.routeName === 'Teams') {
          iconName = 'ios-car';
        } else if (navigation.state.routeName === 'Classement') {
          iconName = 'ios-trophy';
        } else if (navigation.state.routeName === 'Map') {
          iconName = 'ios-map';
        } else if (navigation.state.routeName === 'Medias') {
          iconName = 'ios-images';
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: redTa,
      inactiveTintColor: whiteTa,
      style: {
        backgroundColor: greyDarkTa,
      }
    },
  }
);

// Fan menu
const MyDrawerNavigatorFan = createDrawerNavigator(
  {
    Menu: BottomNavigator,
    Login: LoginScreen,
    Programme: ProgrammeScreen,
    Profil: ProfilScreen,
    News: NewsScreen,
    TeamPilot: TeamPilot,
    Librairie: LibraryScreen,
    'Mon compte': MonCompte
  }
);
const AppFan = createAppContainer(MyDrawerNavigatorFan);

// Pilote menu
const MyDrawerNavigatorPilot = createDrawerNavigator(
  {
    Menu: BottomNavigator,
    Login: LoginScreen,
    'Infos pratiques': HebergementScreen,
    Programme: ProgrammeScreen,
    Profil: ProfilScreen,
    News: NewsScreen,
    TeamPilot: TeamPilot,
    Librairie: LibraryScreen,
    'Mon compte': MonCompte
  }
);
const AppPilot = createAppContainer(MyDrawerNavigatorPilot);

// Unknown user menu
const MyDrawerNavigatorUnknown = createDrawerNavigator(
  {
    Menu: BottomNavigator,
    Login: LoginScreen,
    Programme: ProgrammeScreen,
    News: NewsScreen,
    TeamPilot: TeamPilot,
    Librairie: LibraryScreen
  }
);
const AppUnknown = createAppContainer(MyDrawerNavigatorUnknown);


export default function App() {

  const [userStatus, setUserStatus] = useState('unknown')

  let [fontsLoaded, error] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_900Black,
  });

  useEffect(() => {
    // AsyncStorage.clear()
    const getData = async () => {

      //// Getting data in local storage if existing ////
      try {
        const value = await AsyncStorage.getItem('token')
        if (value !== null) {
          const rawAnswer = await fetch(`${serverUrl}/user/get-user?token=${value}`, {
            method: 'GET',
          });
          const answer = await rawAnswer.json();

          setUserStatus(answer.user.status)
        }

      } catch (e) {
        console.log('ERROR', e);
      }
    }
    getData();
  }, [userStatus])

  // Return the drawer navigation for the right status
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

    return (
      <Provider store={store}>

        {userStatus === 'fan' ? <AppFan /> :
          userStatus === 'pilot' ? <AppPilot /> :
            <AppUnknown />}

      </Provider>
    )
  }

}

