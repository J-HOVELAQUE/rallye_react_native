import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import BottomNavigator from './BottomNavigator';
import StackForNews from './StackForNews';
import StackForSnapScreen from './StackForSnapScreen';

import ProgrammeScreen from '../screens/ProgrammeScreen';
import HomeScreen from '../screens/HomeScreen2';


// Fan menu
const MyDrawerNavigatorFan = createDrawerNavigator(
        {
                Menu: BottomNavigator,
                Home: HomeScreen,
                Programme: ProgrammeScreen,
                News: StackForNews,
                'Mon compte': StackForSnapScreen,
        }
);
const AppFan = createAppContainer(MyDrawerNavigatorFan);

export default AppFan;