import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Card, CardItem, Content, Footer, FooterTab } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

import {  RallyeH1,  greyDarkTa, whiteTa, icoWhite } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.9:3000';

function ProgrammeScreen(props) {

  const [program, setProgram] = useState([])

  useEffect(() => {

    async function getProgram() {
      const rawAnswer = await fetch(`${serverUrl}/program/get-program`, {
        method: 'GET',
      });
      let program = await rawAnswer.json();
      console.log('IN EFFET : ', program.program)
      setProgram(program.program);
    }

    getProgram()
  }, []);

  function schedule(dateString) {

    let hours = new Date(dateString).getHours();
    let minutes = new Date(dateString).getMinutes()

    if (hours.toString().length === 1) {
      hours = '0' + hours
    }

    if (minutes.toString().length === 1) {
      minutes = '0' + minutes
    }
    return (hours + ':' + minutes)
  }

  let programGrid = program.map((planning, i) => (
    <Card key={planning._id} style={{ width: "100%", flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
      <CardItem >

        <Text style={{ fontFamily: 'Roboto_700Bold', fontSize: 20, color: greyDarkTa, textAlign: 'left', marginRight: 20 }}>{schedule(planning.date)}</Text>

        <View style={{ width: '75%' }}>
          {planning.event.map((task)=>(
            <Text key={task}>- {task}</Text>
          ))}
          
        </View>

      </CardItem>
    </Card>
  ))

  console.log(program)

  return (
    <Container>
      <Header style={{ backgroundColor: greyDarkTa }}>
        <Left>
          <Icon name='bars' size={25} style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
        </Left>

        <Body>
          <Text style={{ color: whiteTa }}>PROGRAMME</Text>
        </Body>

        <Right>
          {props.user.status === undefined ?
            <Icon name='user-circle' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
            :
            <Icon name='sign-out' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { AsyncStorage.clear(); props.resetUserConnected(); props.navigation.navigate('Home') }} />
          }
        </Right>
      </Header>

      <Content>
        <RallyeH1 text='Vendredi 16 Décembre 2020'/>
        <ScrollView>
          {programGrid}
        </ScrollView>


      </Content>

      <Footer>
        <FooterTab style={{ backgroundColor: greyDarkTa, }}>
          <Button onPress={() => props.navigation.navigate('Accueil')}>
            <Icon name='home' size={20} style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Accueil</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Pilotes')} >
            <Icon name='car' size={20} style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Pilotes</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Classement')}>
            <Icon name='trophy' size={20} style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Résultats</Text>
          </Button >
          <Button onPress={() => props.navigation.navigate('Live')}>
            <Icon name='map' size={20} style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Map</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Medias')}>
            <Icon name='image' size={20} style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Medias</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>

  );
}

function mapStateToProps(state) {
  return {
    userFavorites: state.userFavorites,
    user: state.userConnected
  }
}


function mapDispatchToProps(dispatch) {
  return {
    resetUserConnected: function () {
      dispatch({
        type: 'reset'
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgrammeScreen);