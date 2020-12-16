import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Header, Content, Text, Right, Left, Body, Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import CardTeam from '../components/CardTeam'
import { RedButtonOutline, RedButton, greyDarkTa, whiteTa, icoWhite } from '../components/rallye-lib';

import HeaderRally from '../components/HeaderRally';
import FooterRally from '../components/FooterRally';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.9:3000';

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

  const noFilter = () => {
    const filteredTeams = allTeams;
    setTeamToDisplay(filteredTeams);
    setDisplayButton('Tous');
  }

  const categoryRegularity = ['Basse', 'Intermédiaire', 'Haute'];

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

  let teams = teamToDisplay.map((team, i) => {
    return <CardTeam key={team._id} infoTeam={team} navigation={props.navigation} />

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
    },
    resetUserConnected: function () {
      dispatch({
        type: 'reset'
      })
    }
  }
}

function mapStateToProps(state) {
  return {
    userFavorites: state.userFavorites,
    userConnected: state.userConnected
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Team);

