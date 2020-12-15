import React, { useEffect, useState } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';


import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';


import Icon from 'react-native-vector-icons/FontAwesome';

///// Screens components /////
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import TeamScreen from './screens/Team';
import ClassementScreen from './screens/Classement';
import LoginScreen from './screens/Login';
import MediaScreen from './screens/MediaScreen';
import HebergementScreen from './screens/HebergementScreen';
import ProgrammeScreen from './screens/ProgrammeScreen';
import MonCompte from './screens/monCompte';
import Photos from './screens/Photos';
import Video from './screens/Video';
import SnapScreen from './screens/SnapScreen';
import OneNewScreen from './screens/OneNewScreen';
import ChatScreen from './screens/ChatScreen';

import NewsScreen from './screens/NewsScreen';

/////  Reducers  //////
import userConnected from './reducers/userConnected';
import userFavorites from './reducers/userFavorites';
import clickedNews from './reducers/clickedNews';


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

///// Disable Warnings //////
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const store = createStore(combineReducers({ userConnected, userFavorites, clickedNews }));

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.9:3000';

var BottomNavigator = createBottomTabNavigator(
  {
    Accueil: HomeScreen,
    Pilotes: TeamScreen,
    Classement: ClassementScreen,
    Live: MapScreen,
    Medias: MediaScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        var iconName;
        if (navigation.state.routeName === 'Accueil') {
          iconName = 'home';
        } else if (navigation.state.routeName === 'Pilotes') {
          iconName = 'car';
        } else if (navigation.state.routeName === 'Classement') {
          iconName = 'trophy';
        } else if (navigation.state.routeName === 'Live') {
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

// Stack navigation for the SnapScreen on MonCompte
const StackForSnapScreen = createStackNavigator({
  'Mon Compte': MonCompte,
  'Snap': SnapScreen
})

// Stack navigation for switch on a news in full screen
const StackForNews = createStackNavigator({
  'News': NewsScreen,
  'Detail': OneNewScreen
},

)

// Fan menu
const MyDrawerNavigatorFan = createDrawerNavigator(
  {
    Menu: BottomNavigator,
    Login: LoginScreen,
    Programme: ProgrammeScreen,
    News: StackForNews,
    'Mon compte': StackForSnapScreen,
    Video: Video,
    Photos: Photos,
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
    News: StackForNews,
    'Mon compte': StackForSnapScreen,
    Video: Video,
    Photos: Photos,
    Chat: ChatScreen
  }
);
const AppPilot = createAppContainer(MyDrawerNavigatorPilot);

// Unknown user menu
const MyDrawerNavigatorUnknown = createDrawerNavigator(
  {
    Menu: BottomNavigator,
    Login: LoginScreen,
    Programme: ProgrammeScreen,
    News: StackForNews,
    Video: Video,
    Photos: Photos
  }
);
const AppUnknown = createAppContainer(MyDrawerNavigatorUnknown);



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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