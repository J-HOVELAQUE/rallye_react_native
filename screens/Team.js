import React, { useEffect, useState } from 'react';
import { Header, Content, Button, Icon, Card, CardItem, Text, Right, Left, Body ,Title, Container} from 'native-base';
import { View, StyleSheet, ImageBackground, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux'

import CardTeam from '../components/CardTeam'

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.9:3000';

function Team(props) {

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

  console.log('TEAMS : ', allTeams.length)

  let teams = allTeams.map((team, i) => {
    return <CardTeam key={i} infoTeam={team} navigation={props.navigation} />
  })

  return (
    <Container>
    

<Header style={{ backgroundColor: '#313131'}}>
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

      <Content style={{backgroundColor:"black"}}>
        {/* <CardTeam navigation={props.navigation} /> */}
        {teams}

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