import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';


////// Menus //////
import AppPilot from './navigation/AppPilot';
import AppFan from './navigation/AppFan';
import AppUnknown from './navigation/AppUnknown';


/////  Reducers  //////
import userConnected from './reducers/userConnected';
import userFavorites from './reducers/userFavorites';
import clickedNews from './reducers/clickedNews';
import chatHistory from './reducers/chatHistory';

// Fonts
import { AppLoading } from 'expo';
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_900Black,
} from '@expo-google-fonts/roboto';

///// Disable Warnings //////
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);          // Ignore log notification by message
LogBox.ignoreAllLogs();                     //Ignore all log notifications

const store = createStore(combineReducers({ userConnected, userFavorites, clickedNews, chatHistory }));

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.9:3000';

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
          (userStatus === 'pilot' || userStatus === 'admin') ? <AppPilot /> :
            <AppUnknown />}
      </Provider>
    )
  }
}