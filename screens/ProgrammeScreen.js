import React, { useEffect, useState } from 'react';
import { Container } from 'native-base';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import HeaderRally from '../components/HeaderRally';
import FooterRally from '../components/FooterRally';
import ProgramGrid from '../components/ProgramGrid';

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


  return (
    <Container>
      <HeaderRally openBurgerMenu={props.navigation.openDrawer}
        nav={props.navigation.navigate}
        titleHeader="PROGRAMME" />

      <ScrollableTabView
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar />}
      >
        <ProgramGrid tabLabel='14/12/2020' day='14/12/2020' program={program} />
        <ProgramGrid tabLabel='15/12/2020' day='15/12/2020' program={program} />
        <ProgramGrid tabLabel='16/12/2020' day='16/12/2020' program={program} />
        <ProgramGrid tabLabel='17/12/2020' day='17/12/2020' program={program} />
        <ProgramGrid tabLabel='18/12/2020' day='18/12/2020' program={program} />
      </ScrollableTabView>

      <FooterRally nav={props.navigation.navigate} />

    </Container>
  );
}

export default ProgrammeScreen;