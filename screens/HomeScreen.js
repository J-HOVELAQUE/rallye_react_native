import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { Text, Container, Content } from 'native-base';
import { Table, Row, Rows } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import { RedButton, RallyeH1, RallyeH2, greyDarkTa, blackTa, greyLightTa } from '../components/rallye-lib';
import HeaderRally from '../components/HeaderRally';
import { getData } from '../tools/toolkit';

const HeadTable = ['Horaires', 'Itinéraires'];
const DataTable = [
  ['08:00', 'Vers-Pont-Du-Gard / Castillon-Du-Gard / Remoulins'],
  ['08:10', 'Fournes / Roquemaure'],
  ['08:35', 'Orange / Serignan-Du-Comtat'],
];

function HomeScreen(props) {

  useEffect(() => {

    const connection = async () => {

      //// Getting data in local storage if existing ////
      const answer = await getData();

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
    connection();
  }, [])

  return (
    <Container>

      <HeaderRally openBurgerMenu={props.navigation.openDrawer}
        nav={props.navigation.navigate}
        titleHeader="HOME" />

      <Content >

        <View style={{ marginLeft: 10 }}>
          <RallyeH1 text="ETAPE 4 : VENDREDI 18 DEC." />
          <Text><Icon name='flag' /> <RallyeH2 style={{ margin: 20 }} text="VERS-PONT-DU-GARD" /></Text>
          <Text><Icon name='flag-checkered' /> <RallyeH2 text="CIRCUIT PAUL RICARD" /></Text>
          <Text style={{ marginTop: 10, color: greyLightTa }}>Aujourd'hui, avant dernière étape du rallye qui partira de Vers-Pont-du-Gard et se terminera au circuit Paul Ricard. Un parcours de plus de 350 km !</Text>
        </View>

        <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
          <RallyeH1 text="PROGRAMME DU JOUR" />
          <Text style={{ marginBottom: 10, color: greyLightTa }}>Horaires de départ des premières voitures</Text>
          <Table borderStyle={{ borderWidth: 1, borderColor: greyLightTa }}>
            <Row data={HeadTable} style ={{marginHorizontal: 5}}/>
            <Rows data={DataTable} style ={{marginHorizontal: 5, marginVertical:5, alignItems: 'top' }}/>
          </Table>
        </View>

        <View style={{ marginHorizontal: 10 }}>
          <RedButton onPress={() => props.navigation.navigate('Programme')} title="Programme en détail" style={{ flex: 1, alignItems: 'flex-end' }} />
        </View>

        <View style={{ marginHorizontal: 10 }}>
          <RallyeH1 text="ITINERAIRE" />
          <Image source={require('../assets/testmap.jpg')} style={{ height: 180, borderColor: blackTa }} />
          <RedButton onPress={() => props.navigation.navigate('Map')} title="Live" style={{ flex: 1, alignItems: 'flex-end' }} />
        </View>
      </Content>

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
    resetUserConnected: function () {
      dispatch({
        type: 'reset'
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
    favorites: state.userFavorites,
    user: state.userConnected
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);