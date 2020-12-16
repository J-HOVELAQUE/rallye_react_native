import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';


import BottomNavigator from './BottomNavigator';
import StackForNews from './StackForNews';


import LoginScreen from '../screens/Login';
import ProgrammeScreen from '../screens/ProgrammeScreen';
import Video from '../screens/Video';
import Photos from '../screens/Photos';

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

export default AppUnknown;