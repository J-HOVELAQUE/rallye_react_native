import React, { useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { Text, Container, Header, Content, Footer, FooterTab, Button, Accordion, Left, Title, Body, Right, Card, CardItem } from 'native-base';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { RedButtonLogin, RedButton, RallyeH1, RallyeH2, RallyeH3, greyDarkTa, whiteTa, icoWhite, blackTa, ProfilAvatar, greyLightTa } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';

const HeadTable = ['Horaires', 'Itinéraires'];
const DataTable = [
  ['06H15', 'Paris - Grand Palais', 'Cours la Reine, av Versailles'],
  ['06H30', 'Boulogne Billancourt', 'av E.Vaillant, av G.Leclerc, Pont de Sèvres'],
  ['07H05', 'Marcoussis', 'N118, N104'],
];

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.9:3000';

function HomeScreen(props) {

  useEffect(() => {
    const getData = async () => {

      //// Getting data in local storage if existing ////
      try {
        const value = await AsyncStorage.getItem('token')
        if (value !== null) {

          const rawAnswer = await fetch(`${serverUrl}/user/get-user?token=${value}`, {
            method: 'GET',
          });
          const answer = await rawAnswer.json();

          //// Record user connected on the reduce store /////
          props.onRecordUserConnected(answer.user);

          const favorite = answer.user.favorite.map(fav => {
            const returnOb = {};
            returnOb._id = fav._id;
            returnOb.car_id = fav.car_id;
            return returnOb;
          })

          props.retrieveFavoriteTeam(favorite);
        }
      } catch (e) {
        console.log('ERROR', e);
      }
    }
    getData();
  }, [])

  return (
    <Container>

      <Header style={{ backgroundColor: greyDarkTa }}>
        <Left>
          <Icon name='bars' size='25x' style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
        </Left>

        <Body>
          <Text style={{ color: whiteTa }}>HOME</Text>
        </Body>

        <Right>
          <Icon name='user-circle' size='25x' style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
        </Right>
      </Header>

      <Content >
        <View>
          <RedButtonLogin onPress={() => { props.navigation.navigate('Login') }} title="Login" style={{ flex: 1, alignItems: 'flex-end' }} />
        </View>

        <View style={{ marginLeft: 10 }}>
          <RallyeH1 text="ETAPE 1 : MARDI 1 SEPT." />
          <Text><Icon name='flag' /><RallyeH2 style={{ margin: 20 }} text="PARIS - GRAND PALAIS" /></Text>
          <Text><Icon name='flag-checkered' /><RallyeH2 text="CLERMONT-FERRAND" /></Text>
          <Text style={{ marginTop: 10, color: greyLightTa }}>Aujourd'hui l'étape partira officiellement de l'autodrome de Linas-Montlhéry et arrivera à la Grande Halle de Clermont-Ferrand. Un parcours de plus de 350 km !</Text>
        </View>

        <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
          <RallyeH1 text="PROGRAMME DU JOUR" />
          <Text style={{ marginBottom: 10, color: greyLightTa }}>Horaires de départ des premières voitures</Text>
          <Table borderStyle={{ borderWidth: 1, borderColor: 'grey' }}>
            <Row data={HeadTable} />
            <Rows data={DataTable} />
          </Table>
        </View>

        <View style={{ marginHorizontal: 10 }}>
          <RedButton onPress={() => props.navigation.navigate('Programme')} title="Programme en détail" style={{ flex: 1, alignItems: 'flex-end' }} />
        </View>

        <View style={{ marginHorizontal: 10 }}>
          <RallyeH1 text="ITINERAIRE" />
          <Image source={require('../assets/testmap.jpg')} style={{ height: 180, borderColor: blackTa }} />
          <RedButton onPress={() => props.navigation.navigate('Map')} onPress={() => props.navigation.navigate('Map')} title="Live" style={{ flex: 1, alignItems: 'flex-end' }} />
        </View>
      </Content>

    </Container >
  );
}

const styles = {
  container: {
    borderWidth: 0, // Remove Border
    shadowColor: 'rgba(0,0,0, 0.0)', // Remove Shadow IOS
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0 // This is for Android
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onRecordUserConnected: function (user) {
      dispatch({
        type: 'record',
        user: user
      })
    },
    retrieveFavoriteTeam: function (listFavorites) {
      dispatch({
        type: 'retrieveFavoriteTeam',
        listFavorites: listFavorites
      })
    }
  }
}

function mapStateToProps(state) {
  return {
    favorites: state.userFavorites
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);