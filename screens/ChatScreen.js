import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, KeyboardAvoidingView } from 'react-native';
import { ListItem, Input } from 'react-native-elements';
import { Container, Content, Header, Button, Footer, FooterTab, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';

import ChatRoom from '../components/ChatRoom';
import { greyDarkTa, RedButton, whiteTa, icoWhite } from '../components/rallye-lib';

// const serverUrl = 'http://192.168.1.9:3000';
const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
var socket = socketIOClient(serverUrl)

function ChatScreen(props) {

    const [currentMsg, setCurrentMsg] = useState('')
    const [room, setRoom] = useState('Officiel')

    useEffect(() => {

        // Function to retrieve chat history
        async function getHistoryChat(roomName) {
            const rawAnswer = await fetch(`${serverUrl}/chat/get-chat?room=${roomName}`, {
                method: 'GET',
            });
            let chatInfo = (await rawAnswer.json()).roomInfo;
            props.storeChat(chatInfo.history, chatInfo.roomName)
        }

        // Open socket between front and back
        socket.on('messageFromChannel', (newMsg) => {
            props.storeChat([newMsg.messageInfo], newMsg.room)
            updateHistoryChat(newMsg.room, newMsg.messageInfo)
        })

        // Call functions
        getHistoryChat('Officiel')
        getHistoryChat('RoomB')
    }, [])

    async function updateHistoryChat(roomName, msg) {
        await fetch(`${serverUrl}/chat/update-chat`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `room=${roomName}&newMsg=${JSON.stringify(msg)}`
        })
    }


    var chatOfficiel = props.chatHistory.map((msg, i) => {
        if (msg.room === 'Officiel') {
            return (
                <ListItem key={msg.msg._id} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{msg.msg.msg}</ListItem.Title>
                        <ListItem.Subtitle>{msg.msg.sender} - {msg.msg.status}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            )
        }
    })

    var chatRoom = props.chatHistory.map((msg, i) => {
        if (msg.room === "RoomB") {
            return (
                <ListItem key={msg.msg._id} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{msg.msg.msg}</ListItem.Title>
                        <ListItem.Subtitle>{msg.msg.sender} - {msg.msg.status}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            )
        }

    })

    var handleChangeRoom = (roomNumber) => {
        setRoom(roomNumber)
        socket.emit('changeRoom', { newRoom: roomNumber.toString() })

    }

    return (
        <Container>
            <Header style={{ backgroundColor: greyDarkTa }}>
                <Left>
                    <Icon name='bars' size={25} style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
                </Left>

                <Body>
                    <Text style={{ color: whiteTa }}>PROGRAMME - HORAIRES</Text>
                </Body>

                <Right>
                    {props.user.status === undefined ?
                        <Icon name='user-circle' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
                        :
                        <Icon name='sign-out' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { AsyncStorage.clear(); props.resetUserConnected(); props.navigation.navigate('Home') }} />
                    }
                </Right>
            </Header>

            <Content>
                <View >

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                        <ChatRoom room='Officiel' buttonPress={() => handleChangeRoom('Officiel')} actif={room === 'Officiel' ? true : false} />
                        <ChatRoom room='RoomB' buttonPress={() => handleChangeRoom('RoomB')} actif={room === 'RoomB' ? true : false} />
                    </View>

                    <ScrollView >
                        {room === 'Officiel' ? chatOfficiel.reverse() : chatRoom.reverse()}
                    </ScrollView >

                    <RedButton
                        title="Send to channel"
                        onPress={() => { socket.emit('messageToChannel', { msg: currentMsg, sender: props.user.firstName, status: props.user.status }); setCurrentMsg('') }}
                    />
                    <Input

                        placeholder='Your message'
                        value={currentMsg}
                        onChangeText={(value) => setCurrentMsg(value)}
                    />

                </View>
            </Content>

            <Footer>
                <FooterTab style={{ backgroundColor: greyDarkTa, }}>
                    <Button onPress={() => props.navigation.navigate('Accueil')}>
                        <Icon name='home' size={20} style={{ color: whiteTa }} />
                        <Text style={{ color: whiteTa, fontSize: 9.5 }}>Accueil</Text>
                    </Button>
                    <Button onPress={() => props.navigation.navigate('Pilotes')} >
                        <Icon name='car' size={20} style={{ color: whiteTa }} />
                        <Text style={{ color: whiteTa, fontSize: 9.5 }}>Pilotes</Text>
                    </Button>
                    <Button onPress={() => props.navigation.navigate('Classement')}>
                        <Icon name='trophy' size={20} style={{ color: whiteTa }} />
                        <Text style={{ color: whiteTa, fontSize: 9.5 }}>Résultats</Text>
                    </Button >
                    <Button onPress={() => props.navigation.navigate('Live')}>
                        <Icon name='map' size={20} style={{ color: whiteTa }} />
                        <Text style={{ color: whiteTa, fontSize: 9.5 }}>Map</Text>
                    </Button>
                    <Button onPress={() => props.navigation.navigate('Medias')}>
                        <Icon name='image' size={20} style={{ color: whiteTa }} />
                        <Text style={{ color: whiteTa, fontSize: 9.5 }}>Medias</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>

    );
}
function mapDispatchToProps(dispatch) {
    return {
        storeChat: function (newMsg, roomName) {
            dispatch({ type: 'storeChat', newMsg, roomName })
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.userConnected,
        chatHistory: state.chatHistory
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatScreen);