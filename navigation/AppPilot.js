import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import BottomNavigator from './BottomNavigator';
import StackForNews from './StackForNews';
import StackForSnapScreen from './StackForSnapScreen';

import LoginScreen from '../screens/Login';
import HebergementScreen from '../screens/HebergementScreen';
import ProgrammeScreen from '../screens/ProgrammeScreen';
import ChatScreen from '../screens/ChatScreen';
import HomeScreen from '../screens/HomeScreen2';






// Pilote menu
const MyDrawerNavigatorPilot = createDrawerNavigator(
    {
        Menu: BottomNavigator,
        Home: HomeScreen,
        Login: LoginScreen,
        'Infos pratiques': HebergementScreen,
        Programme: ProgrammeScreen,
        News: StackForNews,
        'Mon compte': StackForSnapScreen,
        Chat: ChatScreen
    }

);
const AppPilot = createAppContainer(MyDrawerNavigatorPilot);

export default AppPilot;
