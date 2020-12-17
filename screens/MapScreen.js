import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { Container, Text } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import socketIOClient from "socket.io-client";

import HeaderRally from '../components/HeaderRally';
import { RedButton } from '../components/rallye-lib';


const serverUrl = 'https://powerful-earth-91256.herokuapp.com';

const socket = socketIOClient(serverUrl);

function MapScreen(props) {

  const [vehiculeToDisplay, setVehiculeToDisplay] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visibleFavorites, setVisibleFavorites] = useState(false);

  //// Overlay if the user is not connected
  const overlayLogin = (
    <Overlay overlayStyle={{ width: '80%', height: '40%', justifyContent: 'center', alignItems: 'center' }} isVisible={visibleLogin} >
      <View style={{ width: '90%' }}>
        <Text style={{ textAlign: 'center' }}>Créez un compte ou connectez vous pour accéder à la carte</Text>
        <RedButton onPress={() => {
          props.navigation.navigate('Login');
          setVisibleLogin(false)
        }} title="S'inscrire ou se connecter" />
      </View>
    </Overlay>
  )

  //// Overlay if the user has no favorites
  const overlayFavorites = (
    <Overlay overlayStyle={{ width: '80%', height: '30%', justifyContent: 'center', alignItems: 'center' }} isVisible={visibleFavorites} onBackdropPress={() => setVisibleFavorites(!visibleFavorites)}>
      <View style={{ width: '90%' }}>
        <Text style={{ textAlign: 'center' }}>Ajoutez des favoris pour les suivre sur la carte</Text>
        <RedButton onPress={() => {
          props.navigation.navigate('Pilotes');
          setVisibleFavorites(false);
        }} title="Ajouter des favoris" />
      </View>
    </Overlay>
  )

  useEffect(() => {
    socket.on('sendPositionToAll', (msg) => {
      setVehiculeToDisplay(msg.allPosition)
    })

    if (props.user.token === undefined) {
      setVisibleLogin(!visibleLogin);
    } else if (props.userFavorites.length === 0) {
      setVisibleFavorites(!visibleFavorites);
    }
  }, []);

  ///// Update the marker list to display if favorites changes /////
  useEffect(() => {
    const favList = props.userFavorites.map(fav => fav.car_id);
    setUserFavorites(favList);
  }, [props.userFavorites]);

  ///// Filter the teams to display with favorites of the user connected /////
  const displayWithFavorite = vehiculeToDisplay.filter(car => userFavorites.includes(car.idVehicule));

  ///// Build the array of marker /////
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

        <HeaderRally openBurgerMenu={props.navigation.openDrawer}
          nav={props.navigation.navigate}
          titleHeader="LIVE" />

        {overlayLogin}
        {overlayFavorites}

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

export default withNavigationFocus(connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen))