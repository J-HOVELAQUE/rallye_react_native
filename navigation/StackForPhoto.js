import { createStackNavigator } from 'react-navigation-stack';

import MediaScreen from '../screens/MediaScreen';
import PhotoScreen from '../screens/Photos';
import VideoScreen from '../screens/Video';

import { greyDarkTa, whiteTa } from '../components/rallye-lib';

// Stack navigation for switch on a news in full screen //

const StackForPhoto = createStackNavigator(
    {
        Media: {
            screen: MediaScreen,
            navigationOptions: () => ({
                headerShown: false
            })
        },
        Photos: {
            screen: PhotoScreen,

        },
        Video: {
            screen: VideoScreen,

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
    }
);

StackForPhoto.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};

export default StackForPhoto;