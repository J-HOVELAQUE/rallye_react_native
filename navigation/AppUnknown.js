import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import BottomNavigator from './BottomNavigator';
import StackForNews from './StackForNews';

import LoginScreen from '../screens/Login';
import ProgrammeScreen from '../screens/ProgrammeScreen';
import HomeScreen from '../screens/HomeScreen2';


// Unknown user menu
const MyDrawerNavigatorUnknown = createDrawerNavigator(
    {
        Menu: BottomNavigator,
        Home: HomeScreen,
        Login: LoginScreen,
        Programme: ProgrammeScreen,
        News: StackForNews
    }
);
const AppUnknown = createAppContainer(MyDrawerNavigatorUnknown);

export default AppUnknown;