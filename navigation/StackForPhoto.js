import { createStackNavigator } from 'react-navigation-stack';

import MediaScreen from '../screens/MediaScreen';
import PhotoScreen from '../screens/Photos';
import VideoScreen from '../screens/Video';


// Stack navigation for switch on a news in full screen //

const StackForPhoto = createStackNavigator({
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
}
);

export default StackForPhoto;