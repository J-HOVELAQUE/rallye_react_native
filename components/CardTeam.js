import React, { useState } from 'react';
import { Header, Content, Button, Icon, Card, CardItem, Text, Right, Left, Body } from 'native-base';
import { View, StyleSheet, ImageBackground, Image, TouchableHighlight, ScrollView } from 'react-native';
import { Overlay } from 'react-native-elements';
import { connect } from 'react-redux'

import TeamPilot from '../screens/TeamPilot'


const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.9:3000';

function CardTeam(props) {

    // console.log('COMPONENT : ', props.userConnected.status)
    const [styleHeart, setStyleHeart] = useState({ color: 'gray' })
    const team = props.infoTeam

    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };
    // console.log("my favoris : ", props.userFavorites)

    const handleFavorite = async (numTeam) => {
        console.log('team cliquée', numTeam)
        let index = props.userFavorites.indexOf(numTeam)

        // Add or Remove this team from my favorites
        if (index < 0) {
            props.addFavoriteTeam(numTeam)
            setStyleHeart({ color: 'red' })

            // Add new favorite in BDD
            const rawAnswer = await fetch(`${serverUrl}/user/add-favorite`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.userConnected.token}&newValue=${numTeam}`
            })
            const answer = await rawAnswer.json();
            console.log(answer)

        } else {
            props.removeFavoriteTeam(numTeam)
            setStyleHeart({ color: 'gray' })

            // Remove favorite in BDD
            const rawAnswer = await fetch(`${serverUrl}/user/remove-favorite`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.userConnected.token}&valueToRemove=${numTeam}`
            })
        }
    }



    // const handleFocusTeam = (team)=>{
    //     toggleOverlay();
    // <Overlay isVisible={visible} onBackdropPress={() => { toggleOverlay() }}>
    //     <View>
    //       <Text>HO</Text>
    //       <Button
    //         title="OK"
    //         buttonStyle={{ backgroundColor: "#eb4d4b" }}
    //         type="solid"
    //         onPress={() => { toggleOverlay() }}
    //       />
    //     </View>

    //   </Overlay>
    // }

    function namePilot(firstName, lastName) {
        return (firstName.substr(0, 1).toUpperCase() + '. ' + lastName.toUpperCase())
    }

    function fullNamePilot(firstName, lastName) {
        return (firstName.substr(0, 1).toUpperCase() + firstName.substr(1) + ' ' + lastName.toUpperCase())
    }
    // console.log('INFO //// : ', team)
    // console.log('RETOUR : ', namePilot(team.pilot_2.firstname, team.pilot_2.name))
    return (
        <Card style={{ width: 350, flex: 1 }}>
            <CardItem >
                <Left style={{ marginRight: -20, marginLeft: -15 }}>
                    <Text>#{team.car_id}</Text>
                </Left>
                <Body>
                    <Text style={{ fontSize: 10 }}>
                        <Image source={require('../assets/flag-french.png')} style={{ height: 10, width: 10, flex: 1 }} />
                        {namePilot(team.pilot_1.firstname, team.pilot_1.name)}</Text>
                    <Text></Text>
                    <Text style={{ fontSize: 10 }}>
                        <Image source={require('../assets/flag-french.png')} style={{ height: 10, width: 10, flex: 1 }} />
                        {namePilot(team.pilot_2.firstname, team.pilot_2.name)}</Text>
                </Body>

                <Overlay isVisible={visible} onBackdropPress={() => { toggleOverlay() }}>
                    <View>
                        <Card style={{ height:'80%', width: '90%', flex: 1 }}>
                            
                            <CardItem>
                                <Image source={{ uri: team.car.image }} style={{ height:150, width: null, flex: 1 }} />
                            </CardItem>
                            <CardItem>
                                <Body><Text>#{team.car_id}</Text>
                                    <Text>
                                        <Image source={require('../assets/flag-french.png')} style={{ height: 10, width: 10, flex: 1 }} />
                                        {fullNamePilot(team.pilot_1.firstname, team.pilot_1.name)}</Text>
                                    <Text></Text>
                                    <Text>
                                        <Image source={require('../assets/flag-french.png')} style={{ height: 10, width: 10, flex: 1 }} />
                                        {fullNamePilot(team.pilot_2.firstname, team.pilot_2.name)}</Text>
                                </Body>
                            </CardItem>
                            <CardItem>
                                <ScrollView><Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ullamcorper lectus turpis, et lacinia arisi, in congue metus tincidunt vel. Fusce ullamcorper ligula mi. Praesent placerat, nibh non posuere eleifende maximus nunc at interdt sodales purus.</Text>
                            </ScrollView>
                                </CardItem>
                            <CardItem>
                                <Left>
                                    <Icon name="heart" />
                                </Left>

                                <Right>
                                    <Icon name="locate" onPress={() => props.navigation.navigate('Map')} />
                                </Right>
                            </CardItem>
                        </Card>
                        <Button
                            title="OK"
                            buttonStyle={{ backgroundColor: "#eb4d4b" }}
                            type="solid"
                            onPress={() => { toggleOverlay() }}
                        ><Text>OK</Text></Button>
                    </View>

                </Overlay>

                <TouchableHighlight onPress={() => { toggleOverlay() }}>

                    <Image source={{ uri: team.car.image }} style={{ height: 60, width: 90, flex: 1 }} />
                </TouchableHighlight>
                <Right>
                    {props.userConnected.status === undefined ? <Icon /> : <Icon name="heart" style={styleHeart} onPress={() => { handleFavorite(team._id) }} />}
                    <Text></Text>
                    <Icon name="locate" onPress={() => props.navigation.navigate('Map')} />
                </Right>
            </CardItem>
        </Card>

    );
}



function mapDispatchToProps(dispatch) {
    return {
        addFavoriteTeam: function (numTeam) {
            dispatch({
                type: 'addFavoriteTeam',
                numTeam
            })
        },
        removeFavoriteTeam: function (numTeam) {
            dispatch({
                type: 'removeFavoriteTeam',
                numTeam
            })
        }
    }
}

function mapStateToProps(state) {
    return {
        userFavorites: state.userFavorites,
        userConnected: state.userConnected
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardTeam);