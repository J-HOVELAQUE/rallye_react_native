import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Container } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import socketIOClient from "socket.io-client";

import HeaderRally from '../components/HeaderRally';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';

const socket = socketIOClient(serverUrl);

function MapScreen(props) {

  const [vehiculeToDisplay, setVehiculeToDisplay] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    socket.on('sendPositionToAll', (msg) => {
      setVehiculeToDisplay(msg.allPosition)
    }), []
  });

  ///// Update the marker list to display if favorites changes /////
  useEffect(() => {
    const favList = props.userFavorites.map(fav => fav.car_id);
    setUserFavorites(favList);
  }, [props.userFavorites]);

  ///// Filter the teams to display with favorites of the user connected /////
  const displayWithFavorite = vehiculeToDisplay.filter(car => userFavorites.includes(car.idVehicule.toString()));

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
          titleHeader="HEBERGEMENT" />

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