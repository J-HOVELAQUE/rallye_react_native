import { createStackNavigator } from 'react-navigation-stack';

import MonCompte from '../screens/monCompte';
import SnapScreen from '../screens/SnapScreen';

// Stack navigation for the SnapScreen on MonCompte

const StackForSnapScreen = createStackNavigator({
    'Mon Compte': {
        screen: MonCompte,
        navigationOptions: () => ({
            headerShown: false
        })
    },
    Snap: {
        screen: SnapScreen,

    }
});

export default StackForSnapScreen;