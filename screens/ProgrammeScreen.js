import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Container, Card, CardItem, Content } from 'native-base';

import { RallyeH1, greyDarkTa } from '../components/rallye-lib';
import HeaderRally from '../components/HeaderRally';
import FooterRally from '../components/FooterRally';
import { schedule } from '../tools/toolkit';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';

function ProgrammeScreen(props) {

  const [program, setProgram] = useState([])

  useEffect(() => {
    async function getProgram() {
      const rawAnswer = await fetch(`${serverUrl}/program/get-program`, {
        method: 'GET',
      });
      let program = await rawAnswer.json();
      setProgram(program.program);
    }
    getProgram()
  }, []);

  ///// Building card news /////
  let programGrid = program.map((planning, i) => (
    <Card key={planning._id} style={{ width: "100%", flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
      <CardItem >

        <Text style={{ fontFamily: 'Roboto_700Bold', fontSize: 20, color: greyDarkTa, textAlign: 'left', marginRight: 20 }}>{schedule(planning.date)}</Text>

        <View style={{ width: '75%' }}>
          {planning.event.map((task) => (
            <Text key={task}>- {task}</Text>
          ))}

        </View>
      </CardItem>
    </Card>
  ))

  return (
    <Container>
      <HeaderRally openBurgerMenu={props.navigation.openDrawer}
        nav={props.navigation.navigate}
        titleHeader="PROGRAMME" />

      <Content>
        <RallyeH1 text='Vendredi 16 Décembre 2020' />
        <ScrollView>
          {programGrid}
        </ScrollView>
      </Content>

      <FooterRally nav={props.navigation.navigate} />

    </Container>
  );
}

export default ProgrammeScreen;