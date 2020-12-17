import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';


import BottomNavigator from './BottomNavigator';
import StackForNews from './StackForNews';


import LoginScreen from '../screens/Login';
import ProgrammeScreen from '../screens/ProgrammeScreen';
import Video from '../screens/Video';
import Photos from '../screens/Photos';
import HomeScreen from '../screens/HomeScreen';


// Unknown user menu
const MyDrawerNavigatorUnknown = createDrawerNavigator(
    {
        Menu: BottomNavigator,
        'Connection / Inscription': LoginScreen,
        Programme: ProgrammeScreen,
        News: StackForNews
    }
);
const AppUnknown = createAppContainer(MyDrawerNavigatorUnknown);

export default AppUnknown;