import React, { useEffect, useState } from 'react';
import { Header, Content, Button, Icon, Card, CardItem, Text, Right, Left, Body } from 'native-base';
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
    <ImageBackground source={require('../assets/fondCarbon.jpg')} style={styles.container}>

      <Header style={{ backgroundColor: '#313131', width: 500, }}>
        <Button style={{ backgroundColor: '#313131' }}>
          <Icon name='menu' style={{ color: 'white' }} onPress={() => props.navigation.openDrawer()} />
        </Button>
      </Header>

      <Content >
        {/* <CardTeam navigation={props.navigation} /> */}
        {teams}

      </Content>

    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})


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