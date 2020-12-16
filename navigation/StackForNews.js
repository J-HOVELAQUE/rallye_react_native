import { createStackNavigator } from 'react-navigation-stack';

import NewsScreen from '../screens/NewsScreen';
import OneNewScreen from '../screens/OneNewScreen';

// Stack navigation for switch on a news in full screen //

const StackForNews = createStackNavigator({
    News: {
        screen: NewsScreen,
        navigationOptions: () => ({
            headerShown: false
        })
    },
    Detail: {
        screen: OneNewScreen,

    }
}
);

export default StackForNews;