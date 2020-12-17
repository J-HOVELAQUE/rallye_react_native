import { createStackNavigator } from 'react-navigation-stack';

import NewsScreen from '../screens/NewsScreen';
import OneNewScreen from '../screens/OneNewScreen';

import { greyDarkTa, whiteTa } from '../components/rallye-lib';


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

StackForNews.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};

export default StackForNews;