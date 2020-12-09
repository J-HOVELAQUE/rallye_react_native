import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { Icon, Header, Button, Content } from 'native-base';
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
            title={car.idVehicule}
            key={i}
        />
    })

    return (
        <View style={{ flex: 1 }}>

            <Header>
                <Button onPress={() => props.navigation.openDrawer()}>
                    <Icon name='menu' style={{ color: 'white' }} />
                </Button>
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
