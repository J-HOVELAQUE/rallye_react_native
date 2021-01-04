import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, CardItem, Content } from 'native-base';

import { greyDarkTa } from '../components/rallye-lib';
import { schedule } from '../tools/toolkit';

function ProgrammeGrid({ program, day }) {

    let programOfDay = program.filter((plan) => (
        (new Date(plan.date).getDate() + '/' + (new Date(plan.date).getMonth() + 1) + '/' + new Date(plan.date).getFullYear()) === day)
    )

    ///// Building event card /////
    let programGrid = programOfDay.map((planning) => (
        <Card key={planning._id} style={{ width: "100%", flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
            <CardItem >
                <Text style={{ fontFamily: 'Roboto_700Bold', fontSize: 20, color: greyDarkTa, textAlign: 'left', marginRight: 20 }}>{schedule(planning.date)}</Text>

                <View style={{ width: '75%' }}>
                    {planning.event.map((task, i) => (
                        <Text key={task + i}>- {task}</Text>
                    ))}
                </View>
            </CardItem>
        </Card>
    ))

    return (
        <Content>
            <ScrollView>
                {programGrid}
            </ScrollView>
        </Content>

    );
}

export default ProgrammeGrid;