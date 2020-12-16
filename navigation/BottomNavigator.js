import React from 'react';

import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../screens/HomeScreen';
import TeamScreen from '../screens/Team';
import ClassementScreen from '../screens/Classement';
import MapScreen from '../screens/MapScreen';
import MediaScreen from '../screens/MediaScreen';

import { greyDarkTa, redTa, whiteTa } from '../components/rallye-lib';

const BottomNavigator = createBottomTabNavigator(
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

export default BottomNavigator;