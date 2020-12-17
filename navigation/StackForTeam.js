import { createStackNavigator } from 'react-navigation-stack';

import TeamScreen from '../screens/Team';
import DetailTeam from '../screens/DetailTeamScreen';

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