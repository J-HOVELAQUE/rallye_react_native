import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, KeyboardAvoidingView } from 'react-native';
import { ListItem, Input, ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Content, Button, Footer, FooterTab, Left, Body, Right } from 'native-base';
import ChatRoom from '../components/ChatRoom'
import { greyDarkTa, RedButton, RedButtonOutline, whiteTa, icoWhite, RallyeH2, RallyeH3 } from '../components/rallye-lib';


import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client'

// const serverUrl = 'http://192.168.1.9:3000';
const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
var socket = socketIOClient(serverUrl)


function ChatScreen(props) {

    const [currentMsg, setCurrentMsg] = useState('')
    // const [listMessages, setListMessages] = useState([])
    const [msgOfficiel, setMsgOfficiel] = useState([])
    const [msgRoom, setMsgRoom] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0)
    // const buttons = ['Officiel', 'PiloteA', 'PiloteB']
    const [room, setRoom] = useState('Officiel')

    useEffect(() => {
        console.log('///// MONTAGE COMPOSANT //////')
        async function getHistoryChat(roomName) {
            const rawAnswer = await fetch(`${serverUrl}/chat/get-chat?room=${roomName}`, {
                method: 'GET',
            });
            let chatInfo = (await rawAnswer.json()).roomInfo;
            console.log(chatInfo)
            if (roomName === 'Officiel') {
                setMsgOfficiel(chatInfo.history)
            } else if (roomName === 'RoomB') {
                setMsgRoom(chatInfo.history)
            }
        }
        getHistoryChat('Officiel')
        getHistoryChat('RoomB')
    }, [])

    async function updateHistoryChat(roomName, msg) {
        const rawAnswer = await fetch(`${serverUrl}/chat/update-chat`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `room=${roomName}&newMsg=${JSON.stringify(msg)}`
        })
        const answer = await rawAnswer.json();
        console.log('/////// RETOUR CHAT : ', answer)
    }

    useEffect(() => {

        // When message received
        socket.on('messageFromChannel', (newMsg) => {

            console.log('CHANNEL : ', newMsg)
            if (newMsg.room === 'Officiel') {
                setMsgOfficiel([...msgOfficiel, newMsg.messageInfo])
            } else {
                setMsgRoom([...msgRoom, newMsg.messageInfo])
            }
            updateHistoryChat(newMsg.room, newMsg.messageInfo)
        })

    }, [])

    var chatOfficiel = msgOfficiel.map((msg, i) => (
        <ListItem key={i} bottomDivider>
            {/* <Avatar source={{uri: l.avatar_url}} /> */}
            <ListItem.Content>
                <ListItem.Title>{msg.msg}</ListItem.Title>
                <ListItem.Subtitle>{msg.sender} - {msg.status}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    ))

    var chatRoom = msgRoom.map((msg, i) => (
        <ListItem key={i} bottomDivider>
            {/* <Avatar source={{uri: l.avatar_url}} /> */}
            <ListItem.Content>
                <ListItem.Title>{msg.msg}</ListItem.Title>
                <ListItem.Subtitle>{msg.sender} - {msg.status}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    ))

    var handleChangeRoom = (roomNumber) => {
        console.log('NEW ROOM : ', roomNumber)
        // setSelectedIndex(roomNumber)
        // socket.emit('changeRoom', { newRoom: roomNumber.toString(), oldRoom: selectedIndex.toString() })
        setRoom(roomNumber)
        socket.emit('changeRoom', { newRoom: roomNumber.toString() })

    }
    console.log('ROOM : ', room)
    console.log('MsgOFFICIEL : ', msgOfficiel)
    console.log('MshROOM : ', msgRoom)

    // const room1 = () => { <ChatRoom room='Officiel' test={() => handleChangeRoom('Officiel')} /> }
    // const room2 = () => { <ChatRoom room='RoomB' test={() => handleChangeRoom('RoomB')} /> }

    // const buttons = [room1 ,room2 ]
    return (
        <Container >
            <Header style={{ backgroundColor: greyDarkTa }}>
                <Left>
                    <Icon name='bars' size={25} style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
                </Left>

                <Body>
                    <Text style={{ color: whiteTa }}>MESSAGERIE INSTANTANEE</Text>
                </Body>

                <Right>
                    {props.user.status === undefined ?
                        <Icon name='user-circle' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
                        :
                        <Icon name='sign-out' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { AsyncStorage.clear(); props.resetUserConnected(); props.navigation.navigate('Home') }} />
                    }
                </Right>
            </Header>
            <View style={{ flex: 1 }}>
                {/* <ButtonGroup selectedIndex={selectedIndex} buttons={buttons}
                    onPress={(index) => {
                        console.log(index);
                        // handleChangeRoom(index)
                    }} /> */}
                <ChatRoom room='Officiel' test={() => handleChangeRoom('Officiel')} />
                <ChatRoom room='RoomB' test={() => handleChangeRoom('RoomB')} />

                <ScrollView style={{ flex: 1, marginTop: 15 }}>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Parfait et toi ?</ListItem.Title>
                            <ListItem.Subtitle>Alex</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    {room === 'Officiel' ? chatOfficiel : chatRoom}
                </ScrollView >

                {/* <KeyboardAvoidingView behavior="padding" enabled> */}
                <Input
                    containerStyle={{ marginBottom: 5 }}
                    placeholder='Your message'
                    value={currentMsg}
                    onChangeText={(value) => setCurrentMsg(value)}
                />
                <RedButton
                    title="Send to channel"
                    onPress={() => { socket.emit('messageToChannel', { msg: currentMsg, sender: props.user.firstName, status: props.user.status }); setCurrentMsg('') }}
                />
                {/* </KeyboardAvoidingView> */}

            </View>

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

function mapStateToProps(state) {
    return {
        user: state.userConnected
    }
}

export default connect(
    mapStateToProps,
    null
)(ChatScreen);