import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { greyDarkTa, RedButtonOutline, RedButton, whiteTa, icoWhite, RallyeH2, RallyeH3 } from '../components/rallye-lib';


export default function ChatRoom(props) {
    let actif = false
    return (
        <View>
                <RedButton title={props.room} onPress={() => {props.test()}} />
                {/* <RedButtonOutline title={props.room} onPress={() => {console.log(props.room)}} /> */}
        </View>
    )
}