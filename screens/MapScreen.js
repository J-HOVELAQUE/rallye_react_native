import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Left, Right, Icon, Header, Button, Content } from 'native-base';
import MapView, { Marker } from 'react-native-maps';

import socketIOClient from "socket.io-client";

// const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
const serverUrl = 'http://192.168.1.26:3000';

const socket = socketIOClient(serverUrl);

export default function MapScreen(props) {

    useEffect(() => {
        socket.on('sendMessageToAll', (msg) => {
            console.log('Message received', msg)
        })
    }, [])

    return (
        <View style={styles.container}>

            <Header>
                <Button onPress={() => props.navigation.openDrawer()}>
                    <Icon name='menu' style={{ color: 'white' }} />

                </Button>
            </Header>
            <Content>
                <MapView style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 48.866667,
                        longitude: 2.333333,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >

                </MapView>
            </Content>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

