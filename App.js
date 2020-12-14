import React, { useEffect, useState } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { AsyncStorage, Text } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import TeamScreen from './screens/Team';
import ClassementScreen from './screens/Classement';
import LoginScreen from './screens/Login';
import MediaScreen from './screens/MediaScreen';
import HebergementScreen from './screens/HebergementScreen';
import ProgrammeScreen from './screens/ProgrammeScreen';
import LibraryScreen from './screens/LibraryScreen';
import MonCompte from './screens/MonCompte';
import Photos from './screens/Photos';
import Video from './screens/Video';
import SnapScreen from './screens/SnapScreen';

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

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const store = createStore(combineReducers({ userConnected, userFavorites }));
const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.9:3000';

var BottomNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Pilotes: TeamScreen,
    Classement: ClassementScreen,
    Map: MapScreen,
    Medias: MediaScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        var iconName;
        if (navigation.state.routeName === 'Home') {
          iconName = 'tachometer';
        } else if (navigation.state.routeName === 'Pilotes') {
          iconName = 'car';
        } else if (navigation.state.routeName === 'Classement') {
          iconName = 'trophy';
        } else if (navigation.state.routeName === 'Map') {
          iconName = 'map';
        } else if (navigation.state.routeName === 'Medias') {
          iconName = 'image';
        }

        return <Icon name={iconName} size={20} color={tintColor} />;
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
    News: NewsScreen,
    'Mon compte': MonCompte,
    Video: Video,
    Photos: Photos,
    Snap: SnapScreen
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
    News: NewsScreen,
    'Mon compte': MonCompte,
    Video: Video,
    Photos: Photos,
    Snap: SnapScreen
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
    Video: Video,
    Photos: Photos
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

