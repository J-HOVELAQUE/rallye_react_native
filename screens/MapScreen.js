import React, { useEffect } from 'react';
import { View, StyleSheet,ImageBackground } from 'react-native';

import { Icon, Header, Button, Content , Text} from 'native-base';
import MapView from 'react-native-maps';

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
      <ImageBackground source={require('../assets/fondCarbon.jpg')} style={styles.container}>

<Header style={{ backgroundColor: '#313131',width: 500}}>
        <Button style={{ backgroundColor: '#313131'}}>
        <Icon name='menu' style={{ color: 'white' }}  onPress={() => props.navigation.openDrawer()}/>
        </Button>
      </Header>
      <Text style={{color:"white"}}>Page map</Text>
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
            </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

