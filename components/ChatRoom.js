import React from 'react';
import { View } from 'react-native';

import { RedButtonOutline, RedButton} from '../components/rallye-lib';

export default function ChatRoom(props) {
    return (
        <View>
            {props.actif === true ?
                <RedButton title={props.room} onPress={() => { props.buttonPress() }} />
                : <RedButtonOutline title={props.room} onPress={() => { props.buttonPress() }} />
            }
        </View>
    )
}