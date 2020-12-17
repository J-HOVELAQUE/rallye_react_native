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
// const serverUrl = 'http://192.168.1.26:3000';


const socket = socketIOClient(serverUrl);

function MapScreen(props) {

  const [vehiculeToDisplay, setVehiculeToDisplay] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visibleFavorites, setVisibleFavorites] = useState(false);

  const toggleOverlayLogin = () => {
    setVisibleLogin(!visibleLogin);
  };
  
  const toggleOverlayFavorites = () => {
    setVisibleFavorites(!visibleFavorites);
  };

  const connected = props.user.token

  useEffect(() => {
    socket.on('sendPositionToAll', (msg) => {
      setVehiculeToDisplay(msg.allPosition)
    })

    if (connected === undefined) {
      toggleOverlayLogin()
    }
  }, []);

  const overlayLogin = (
    <Overlay overlayStyle={{width:'80%', height: '50%', justifyContent:'center', alignItems:'center'}} isVisible={visibleLogin} >
      <View style={{ width: '90%'}}>
        <Text>Créez un compte ou connectez vous pour accéder à la carte</Text>
        <RedButton onPress={() => {props.navigation.navigate('Login'); toggleOverlayLogin();}} title="S'inscrire ou se connecter" />
      </View>
    </Overlay>
  )

  const overlayFavorites = (
    <Overlay overlayStyle={{width:'80%', height: '50%', justifyContent:'center', alignItems:'center'}} isVisible={visibleLogin} >
      <View style={{ width: '90%'}}>
        <Text>Créez un compte ou connectez vous pour accéder à la carte</Text>
        <RedButton onPress={() => {props.navigation.navigate('Login'); toggleOverlayFavorites();}} title="S'inscrire ou se connecter" />
      </View>
    </Overlay>
  )

  // console.log('>>>>>>>>>>>>>>>FAVV', props.user.token);
  // Si props.user.token is undefined alors overlay pour dire "Creez un compte ou connectez vous"
  // Sinon si props.userFavorites.length === 0 alors overlay pour dire "Ajoutez des favoris pour les suivre sur la carte"


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