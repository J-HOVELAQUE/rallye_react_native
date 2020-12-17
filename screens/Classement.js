import React, { useEffect, useState } from 'react';
import { Content, Container } from 'native-base';
import { View } from 'react-native';

import CardClassement from '../components/CardClassement';
import HeaderRally from '../components/HeaderRally';
import { RedButtonOutline, RedButton } from '../components/rallye-lib';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';

function ClassementScreen(props) {

  const [teamToDisplay, setTeamToDisplay] = useState([]);
  const [displayButton, setDisplayButton] = useState('');
  const [allResults, setAllResults] = useState([]);

  useEffect(() => {
    async function getResults() {
      const rawAnswer = await fetch(`${serverUrl}/results/results`, {
        method: 'GET',
      });
      let answer = await rawAnswer.json();
      setAllResults(answer.results);

      //// Setting displayed result on regularity ////
      let filteredTeams = answer.results.filter(team => categoryRegularity.includes(team.team_id.category));
      setTeamToDisplay(filteredTeams);
      setDisplayButton('Reg');
    }
    getResults()
  }, []);

  const categoryRegularity = ['Basse', 'Intermédiaire', 'Haute'];

  //// Functions for filtering results with category ////
  let filterRegularity = () => {
    const filteredTeams = allResults.filter(team => categoryRegularity.includes(team.team_id.category));
    setTeamToDisplay(filteredTeams);
    setDisplayButton('Reg');
  }

  let filterCompetition = () => {
    const filteredTeams = allResults.filter(team => !categoryRegularity.includes(team.team_id.category));
    setTeamToDisplay(filteredTeams);
    setDisplayButton('Comp');
  }

  //// Building card result ////
  let teamResult = teamToDisplay.map((team, i) => {
    return <CardClassement key={team._id} infoTeam={team.team_id} time={team.time} diff={team.diff} position={team.position} />
  })

  return (
    <Container>
      <HeaderRally openBurgerMenu={props.navigation.openDrawer}
        nav={props.navigation.navigate}
        titleHeader="CLASSEMENT" />

      <Content>
        <View style={{ marginHorizontal: 10, alignItems: 'center' }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {
              displayButton == 'Reg' ?
                <RedButton onPress={() => filterRegularity()} title="Régularité" />
                :
                <RedButtonOutline onPress={() => filterRegularity()} title="Régularité" />
            }
            {
              displayButton == 'Comp' ?
                <RedButton onPress={() => filterCompetition()} title="Compétition" />
                :
                <RedButtonOutline onPress={() => filterCompetition()} title="Compétition" />
            }
          </View>
        </View>
        <View style={{ marginTop: 10, alignItems: "center" }}>

          {teamResult}

        </View>
      </Content>

    </Container>
  );
}

export default ClassementScreen;