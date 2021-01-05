import React, { useEffect, useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { ListItem, Input } from 'react-native-elements';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';

import ChatRoom from '../components/ChatRoom';
import HeaderRally from '../components/HeaderRally';
import FooterRally from '../components/FooterRally';
import { RedButton } from '../components/rallye-lib';

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
        getHistoryChat('Public')
    }, [])

    async function updateHistoryChat(roomName, msg) {
        await fetch(`${serverUrl}/chat/update-chat`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `room=${roomName}&newMsg=${JSON.stringify(msg)}`
        })
    }

    // Building list of message in official room //
    var chatOfficiel = props.chatHistory.map((msg, i) => {
        if (msg.room === 'Officiel') {
            return (
                <ListItem key={msg.msg._id} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{msg.msg.msg}</ListItem.Title>
                        <ListItem.Subtitle>
                            {msg.msg.sender} - {msg.msg.status}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            )
        }
    })

    // Building list of message in public room //
    var chatRoom = props.chatHistory.map((msg, i) => {
        if (msg.room === "Public") {
            return (
                <ListItem key={msg.msg._id} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{msg.msg.msg}</ListItem.Title>
                        <ListItem.Subtitle>
                            {msg.msg.sender} - {msg.msg.status}
                        </ListItem.Subtitle>
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
            <HeaderRally openBurgerMenu={props.navigation.openDrawer}
                nav={props.navigation.navigate}
                titleHeader="MESSAGERIE INSTANTANEE" />

            <Content>
                <View >
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                        <ChatRoom room='Officiel'
                            buttonPress={() => handleChangeRoom('Officiel')}
                            actif={room === 'Officiel' ? true : false} />
                        <ChatRoom room='Public'
                            buttonPress={() => handleChangeRoom('Public')}
                            actif={room === 'Public' ? true : false} />
                    </View>

                    <ScrollView style={{ height: Dimensions.get('window').height / 2 }}>
                        {room === 'Officiel' ? chatOfficiel.reverse() : chatRoom.reverse()}
                    </ScrollView>

                    <RedButton
                        title="Envoyer"
                        onPress={() => {
                            socket.emit('messageToChannel',
                                { msg: currentMsg, sender: props.user.firstName, status: props.user.status });
                            setCurrentMsg('')
                        }}
                    />

                    <Input
                        placeholder='Votre message'
                        value={currentMsg}
                        onChangeText={(value) => setCurrentMsg(value)}
                    />
                </View>
            </Content>

            <FooterRally nav={props.navigation.navigate} />

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