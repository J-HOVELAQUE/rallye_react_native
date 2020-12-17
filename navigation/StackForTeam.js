import { createStackNavigator } from 'react-navigation-stack';

import TeamScreen from '../screens/Team';
import DetailTeam from '../screens/DetailTeamScreen';

// Stack navigation for switch on a news in full screen //

const StackForNews = createStackNavigator({
    Teams: {
        screen: TeamScreen,
        navigationOptions: () => ({
            headerShown: false
        })
    },
    Detail: {
        screen: DetailTeam,

    }
}
);

export default StackForNews;