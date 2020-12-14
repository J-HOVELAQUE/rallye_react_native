import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Image, ImageBackground, ScrollView } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Card, CardItem, Content, Footer, FooterTab } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

import { RedButtonLogin, RedButton, RallyeH1, RallyeH2, RallyeH3, greyDarkTa, whiteTa, icoWhite, blackTa, ProfilAvatar, greyLightTa } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';


function ProgrammeScreen(props) {

  return (
    <Container>
      <Header style={{ backgroundColor: greyDarkTa }}>
        <Left>
          <Icon name='bars' size={25} style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
        </Left>

        <Body>
          <Text style={{ color: whiteTa }}>PROGRAMME - HORAIRES</Text>
        </Body>

        <Right>
          {props.user.status === undefined ?
            <Icon name='user-circle' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
            :
            <Icon name='sign-out' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { AsyncStorage.clear(); props.resetUserConnected() ; props.navigation.navigate('Home') }} />
          }
        </Right>
      </Header>

      <Content>


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