import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { Container, Header, Left, Body, Right, Button, Icon, Title,Card,CardItem,Content } from 'native-base';
import MapView, { Marker } from 'react-native-maps';

import socketIOClient from "socket.io-client";

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.26:3000';

const socket = socketIOClient(serverUrl);

export default function MapScreen(props) {

    const [vehiculeToDisplay, setVehiculeToDisplay] = useState([]);

    useEffect(() => {
        socket.on('sendPositionToAll', (msg) => {
            setVehiculeToDisplay(msg.allPosition)

        }), []
    })

    const markerVehicules = vehiculeToDisplay.map((car, i) => {
        return <Marker
            coordinate={{ latitude: car.lat, longitude: car.long }}
            title={car.idVehicule.toString()}
            key={i}
        />
    })

    return (
        <View style={{ flex: 1 }}>

        <Header style={{ backgroundColor: '#313131'}}>
          <Left>
            <Button transparent>
              <Icon name='ios-people' />
            </Button>
          </Left>
          <Body>
            <Title>Map</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
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
    );
}
