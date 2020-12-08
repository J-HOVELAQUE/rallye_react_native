import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';
import MapView, { Marker } from 'react-native-maps';

import socketIOClient from "socket.io-client";

// const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
const serverUrl = 'http://192.168.1.26:3000';

const socket = socketIOClient(serverUrl);

function MapScreen(props) {

    useEffect(() => {
        socket.on('sendMessageToAll', (msg) => {
            console.log('Message received', msg)
        })
    }, [])

    return (
        <View style={styles.container}>
            <Header
                leftComponent={<Icon name="menu" onPress={() => props.navigation.openDrawer()} />}
            />

            <MapView style={{ flex: 1 }}
                initialRegion={{
                    latitude: 48.866667,
                    longitude: 2.333333,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >

            </MapView>

        </View>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default MapScreen;
