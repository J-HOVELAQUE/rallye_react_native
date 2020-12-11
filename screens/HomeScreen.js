import React, { useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { Text, Container, Header, Content, Footer, FooterTab, Button, Icon, Accordion, Left, Title, Body, Right, Card, CardItem } from 'native-base';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { RallyeH1, RallyeH2, RallyeH3 } from '../components/rallye-lib';


const HeadTable = ['Horaires', 'Itinéraires'];
const DataTable = [
  ['09H00', 'Paris / Nemours'],
  ['10H30', 'Pause Nemours'],
  ['10H45', 'Nemours / Orléans'],
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

      <Header style={{ backgroundColor: '#313131' }}>
        <Left>
          <Button transparent>
            <Icon name='ios-people' />
          </Button>
        </Left>
        <Body>
          <RallyeH1 text="HOME" />
        </Body>
        <Right>
          <Button transparent onPress={() => props.navigation.openDrawer()}>
            <Icon name='menu' />
          </Button>
        </Right>
      </Header>

      <ImageBackground source={require('../assets/fondCarbon.jpg')} style={{ flex: 1 }}>
        <Content >
          <View style={{ flex: 1, alignItems: "center", flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
            <Button style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "red", width: "40%" }} onPress={() => props.navigation.navigate('Login')}>
              <Icon name='home' />
              <Text >Login</Text>
            </Button>
          </View>
          <View style={{ alignItems: "center" }}>
            <Card style={{ width: "97%", flex: 1 }}>
              <CardItem style={{ flexDirection: "column", alignItems: "flex-start", flex: 1 }}>
                <RallyeH2 text="Programme du jour : 11/12/2020" />

                <RallyeH3 text="Etape 1 : Paris / Orléans" />

              </CardItem>
            </Card>
          </View>

          <View style={{ alignItems: "center" }}>
            <Card style={{ width: "97%", flex: 1 }}>
              <CardItem style={{ flexDirection: "column", alignItems: "flex-start", flex: 1 }}>

                <Text>Aujourd'hui trajet de Paris Grand Palais à la ville d'Orléans.</Text>
              </CardItem>
            </Card>
          </View>





          <View style={{ alignItems: "center" }}>
            <Card style={{ width: "97%", flex: 1, }}>
              {/* <Title style={{ alignItems: "flex-start" }}>Etapes</Title> */}
              <RallyeH1 text="Etapes" />
              <Table borderStyle={{ borderWidth: 1, borderColor: 'grey' }}>
                <Row data={HeadTable} />
                <Rows data={DataTable} />
              </Table>
            </Card>
          </View>

          <View style={{ alignItems: "center" }}>
            <Card style={{ width: "97%", flex: 1, }}>

              <CardItem>
                <Image source={require('../assets/testmap.jpg')} style={{ height: 180, flex: 1, borderColor: 'black' }} />
              </CardItem>


            </Card>
            <View style={{ flex: 1, alignItems: "center", flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
              <Button style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "red", width: "40%" }} onPress={() => props.navigation.navigate('Map')}>
                <Icon name='ios-map' />
                <Text >Live Map</Text>
              </Button>
            </View>
          </View>





        </Content>

      </ImageBackground>
    </Container >
  );
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