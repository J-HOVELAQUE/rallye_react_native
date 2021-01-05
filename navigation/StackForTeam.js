import { createStackNavigator } from 'react-navigation-stack';

import TeamScreen from '../screens/Team';
import DetailTeam from '../screens/DetailTeamScreen';

import { greyDarkTa, whiteTa } from '../components/rallye-lib';

// Stack navigation for switch on a team detail in full screen //

const StackForTeam = createStackNavigator({
    Teams: {
        screen: TeamScreen,
        navigationOptions: () => ({
            headerShown: false
        })
    },
    Detail: {
        screen: DetailTeam,

    }
},
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: greyDarkTa,
            },
            headerTintColor: whiteTa,
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    });

StackForTeam.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};

export default StackForTeam;