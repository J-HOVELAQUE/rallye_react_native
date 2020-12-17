import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Content, Container } from 'native-base';
import { connect } from 'react-redux';

import CardTeam from '../components/CardTeam';
import { RedButtonOutline, RedButton } from '../components/rallye-lib';
import HeaderRally from '../components/HeaderRally';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';

function Team(props) {
  const [allTeams, setAllTeams] = useState([]);
  const [teamToDisplay, setTeamToDisplay] = useState([]);
  const [displayButton, setDisplayButton] = useState('Tous');

  useEffect(() => {
    async function getTeams() {
      const rawAnswer = await fetch(`${serverUrl}/teams/get-teams`, {
        method: 'GET',
      });
      let allTeamsInfos = await rawAnswer.json();
      setAllTeams(allTeamsInfos.teams);
      setTeamToDisplay(allTeamsInfos.teams);
    }
    getTeams()
  }, []);

  const categoryRegularity = ['Basse', 'Intermédiaire', 'Haute'];

  //// Function for filterirng team with category ////
  const noFilter = () => {
    const filteredTeams = allTeams;
    setTeamToDisplay(filteredTeams);
    setDisplayButton('Tous');
  }

  const filterRegularity = () => {
    const filteredTeams = allTeams.filter(team => categoryRegularity.includes(team.category));
    setTeamToDisplay(filteredTeams);
    setDisplayButton('Reg');
  }

  const filterCompetition = () => {
    const filteredTeams = allTeams.filter(team => !categoryRegularity.includes(team.category));
    setTeamToDisplay(filteredTeams);
    setDisplayButton('Comp');
  }

  //// Building card team /////
  let teams = teamToDisplay.map((team, i) => {
    return <CardTeam key={team._id} infoTeam={team} nav={props.navigation} />
  })

  return (
    <Container>

      <HeaderRally openBurgerMenu={props.navigation.openDrawer}
        nav={props.navigation.navigate}
        titleHeader="LISTE DES ENGAGES" />

      <Content>
        <View style={{ marginHorizontal: 10, alignItems: 'center' }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {
              displayButton == 'Tous' ?
                <RedButton onPress={() => noFilter()} title="Tous" />
                :
                <RedButtonOutline onPress={() => noFilter()} title="Tous" />
            }
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
          {teams}
        </View>

      </Content>

    </Container>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addFavoriteTeam: function (numTeam) {
      dispatch({
        type: 'addFavoriteTeam',
        numTeam
      })
    },
    removeFavoriteTeam: function (numTeam) {
      dispatch({
        type: 'removeFavoriteTeam',
        numTeam
      })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Team);