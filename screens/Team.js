import React, { useEffect, useState } from 'react';
import { Header, Content, Button, Icon, Card, CardItem, Text, Right, Left, Body, Title, Container } from 'native-base';
import { View, StyleSheet, ImageBackground, Image, TouchableHighlight, Picker } from 'react-native';
import { connect } from 'react-redux'
import { Input, Overlay } from 'react-native-elements'

import CardTeam from '../components/CardTeam'

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.9:3000';

function Team(props) {
  const [selectedValue, setSelectedValue] = useState("General");
  const [allTeams, setAllTeams] = useState([])

  useEffect(() => {

    async function getTeams() {
      const rawAnswer = await fetch(`${serverUrl}/teams/get-teams`, {
        method: 'GET',
      });
      let allTeamsInfos = await rawAnswer.json();
      setAllTeams(allTeamsInfos.teams)
    }
    getTeams()
  }, [])

  console.log('FAVORITES', props.userFavorites);

  let teams = allTeams.map((team, i) => {
    return <CardTeam key={i} infoTeam={team} navigation={props.navigation} />
  })

  return (
    <Container>


      <Header style={{ backgroundColor: '#313131' }}>
        <Left>
          <Button transparent>
            <Icon name='ios-people' />
          </Button>
        </Left>
        <Body>
          <Title>Les Equipes</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => props.navigation.openDrawer()}>
            <Icon name='menu' />
          </Button>
        </Right>
      </Header>

      <Content style={{ backgroundColor: "black" }}>
        <View style={{ width: "100%", backgroundColor: "#E4E4E4" }}>

          <Picker
            mode="dropdown"

            selectedValue={selectedValue}
            style={{ height: 50, width: 150, backgroundColor: "#E4E4E4" }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="General" value="General" />
            <Picker.Item label="Moyenne Basse" value="Moyenne basse" />
            <Picker.Item label="Moyenne Intermédiaire" value="Moyenne Intermédiaire" />
            <Picker.Item label="Moyenne Haute" value="Moyenne Haute" />
          </Picker>
          <Input placeholder='Rechercher' style={{ backgroundColor: "#E4E4E4" }}></Input>
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