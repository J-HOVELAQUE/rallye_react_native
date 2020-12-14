import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import { Container, Header, Left, Body, Right, Text } from 'native-base';
import MapView, { Marker } from 'react-native-maps';

import { RedButtonLogin, RedButton, RallyeH1, RallyeH2, RallyeH3, greyDarkTa, whiteTa, icoWhite, blackTa, ProfilAvatar, greyLightTa } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';

import socketIOClient from "socket.io-client";

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.26:3000';

const socket = socketIOClient(serverUrl);

function MapScreen(props) {


  const [vehiculeToDisplay, setVehiculeToDisplay] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    socket.on('sendPositionToAll', (msg) => {
      setVehiculeToDisplay(msg.allPosition)

    }), []
  });

  useEffect(() => {
    const favList = props.userFavorites.map(fav => fav.car_id);
    setUserFavorites(favList);
  }, [props.userFavorites]);


  const displayWithFavorite = vehiculeToDisplay.filter(car => userFavorites.includes(car.idVehicule.toString()));


  const markerVehicules = displayWithFavorite.map((car, i) => {
    return <Marker
      coordinate={{ latitude: car.lat, longitude: car.long }}
      title={car.idVehicule.toString()}
      pinColor={car.color}
      key={i}
    />
  })

  return (
    <Container>
    <View style={{ flex: 1 }}>

      <Header style={{ backgroundColor: greyDarkTa }}>
        <Left>
          <Icon name='bars' size={25} style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
        </Left>

        <Body>
          <Text style={{ color: whiteTa }}>MAP</Text>
        </Body>

        <Right>
          <Icon name='user-circle' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
        </Right>
      </Header>

      < MapView style={{ flex: 1 }
      }
        initialRegion={{
          latitude: 48.866667,
          longitude: 2.333333,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markerVehicules}
      </MapView >

    </View>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    userFavorites: state.userFavorites,
  }
}

export default withNavigationFocus(connect(
  mapStateToProps,
  null
)(MapScreen))