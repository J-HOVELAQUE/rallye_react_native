import React, { useEffect, useState } from 'react';
import { Header, Content, Button, Card, CardItem, Text, Right, Left, Body, Title, Container, Row } from 'native-base';
import { View, StyleSheet, ImageBackground, Image, TouchableHighlight, Picker } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { Input, Overlay } from 'react-native-elements'

import { RedButtonOutline, RedButton, RallyeH1, RallyeH2, RallyeH3, greyDarkTa, whiteTa, icoWhite, blackTa, ProfilAvatar, greyLightTa, SearchInput, EmailInput } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';

import CardTeam from '../components/CardClassement'

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://localhost:3000';

function Team(props) {
  const [selectedValue, setSelectedValue] = useState("General");
  const [allTeams, setAllTeams] = useState([]);
  const [searchTeam, setSearchTeam] = useState([]);
  const [teamToDisplay, setTeamToDisplay] = useState([]);
  const [displayButton, setDisplayButton] = useState('');

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

  const filterRegularity = () => {
    const filteredTeams = allTeams.filter(team => categoryRegularity.includes(team.category));
    // console.log("REGULARITY", filteredTeams);
    setTeamToDisplay(filteredTeams);
    setDisplayButton('Reg');
  }

  const filterCompetition = () => {
    const filteredTeams = allTeams.filter(team => !categoryRegularity.includes(team.category));
    // console.log("COMPETITION", filteredTeams);
    setTeamToDisplay(filteredTeams);
    setDisplayButton('Comp');
  }

  // console.log('FAVORITES', props.userFavorites);

  let teams = teamToDisplay.map((team, i) => {
    return <CardTeam key={team._id} infoTeam={team} navigation={props.navigation} />

  })

  return (
    <Container>

      <Header style={{ backgroundColor: greyDarkTa }}>
        <Left>
          <Icon name='bars' size={25} style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
        </Left>

        <Body>
          <Text style={{ color: whiteTa }}>CLASSEMENT</Text>
        </Body>

        <Right>
          {props.userConnected.status === undefined ?
            <Icon name='user-circle' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
            :
            <Icon name='sign-out' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { AsyncStorage.clear(); props.resetUserConnected() ; props.navigation.navigate('Home') }} />
          }
        </Right>
      </Header>

      <Content>
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: blackTa, color: whiteTa }}>
          <SearchInput onChangeText={(val) => setSearchTeam(val)} placeholder='Rechercher...' />
        </View>
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

          {/* <Picker
            mode="dropdown"
            selectedValue={selectedValue}
            style={{ height: 50, width: 150, backgroundColor: "#E4E4E4" }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="General" value="General" />
            <Picker.Item label="Moyenne Basse" value="Moyenne basse" />
            <Picker.Item label="Moyenne Intermédiaire" value="Moyenne Intermédiaire" />
            <Picker.Item label="Moyenne Haute" value="Moyenne Haute" />
          </Picker> */}
          {/* <searchInput onChangeText="Rechercher" /> */}

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

