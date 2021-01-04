import React from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Text, Right, Left, Body } from 'native-base';

import { greyDarkTa, redTa, whiteTa } from '../components/rallye-lib';
import { flagNationality, namePilot } from '../tools/toolkit';

//// This card component need following props to work properly : 
//     { position,time, diff and infoTeam: {
//         car_id
//         pilot_1.nationality
//         pilot_1.firstname
//         pilot_1.name
//         pilot_2.nationality
//         pilot_2.firstname
//         pilot_2.name
// }}

function CardClassement({ position, time, diff, infoTeam }) {

    return (
        <Card style={{ width: "100%", flex: 1 }}>
            <CardItem >

                <Left style={{ marginHorizontal: -10 }}>

                    <Text style={{
                        fontFamily: 'Roboto_700Bold',
                        fontSize: 20,
                        color: whiteTa,
                        textAlign: 'center',
                        backgroundColor: redTa,
                        paddingHorizontal: 10,
                        paddingVertical: 5
                    }}>{position}</Text>

                    <Text style={{
                        fontFamily: 'Roboto_700Bold',
                        fontSize: 20,
                        color: greyDarkTa,
                        textAlign: 'right',
                        paddingHorizontal: 10
                    }}>#{infoTeam.car_id}</Text>

                </Left>

                <Body style={{ justifyContent: 'center', marginHorizontal: -30 }}>

                    <Text style={{ fontSize: 12, paddingHorizontal: 5 }}>
                        <Image source={{ uri: flagNationality(infoTeam.pilot_1.nationality) }}
                            style={{ height: 10, width: 15 }} />
                        {namePilot(infoTeam.pilot_1.firstname, infoTeam.pilot_1.name)}
                    </Text>

                    <Text style={{ fontSize: 12, paddingHorizontal: 5 }}>
                        <Image source={{ uri: flagNationality(infoTeam.pilot_2.nationality) }}
                            style={{ height: 10, width: 15 }} />
                        {namePilot(infoTeam.pilot_2.firstname, infoTeam.pilot_2.name)}
                    </Text>
                </Body>

                <Right style={{ alignItems: 'center', marginHorizontal: -25 }}>
                    <Text>{time}</Text>
                    <Text note>{diff}</Text>
                </Right>

            </CardItem>
        </Card>
    );
}

export default CardClassement;