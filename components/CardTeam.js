import React, { useState } from 'react';
import { Header, Content, Button, Icon, Card, CardItem, Text, Right, Left, Body } from 'native-base';
import { View, StyleSheet, ImageBackground, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux'


const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.9:3000';

function CardTeam(props) {

    const [styleHeart, setStyleHeart] = useState({ color: 'gray' })
    const team = props.infoTeam

    const handleFavorite = async (numTeam, bib) => {
        console.log('team cliquée', numTeam)

        const filteredFav = props.userFavorites.filter(fav => fav._id === numTeam);

        // Add or Remove this team from my favorites
        if (filteredFav.length < 1) {
            props.addFavoriteTeam({
                _id: numTeam,
                car_id: bib
            })
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

    function namePilot(firstName, lastName) {
        return (firstName.substr(0, 1).toUpperCase() + '. ' + lastName.toUpperCase())
    }

    return (
        <Card style={{ width: "90%", flex: 1 }}>
            <CardItem >
                <Left >
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
                <TouchableHighlight onPress={() => props.navigation.navigate('TeamPilot')}>
                    <Image source={{ uri: team.car.image }} style={{ height: 60, width: 90, flex: 1 }} />
                </TouchableHighlight>
                <Right>
                    {props.userConnected.status === undefined ? <Icon /> : <Icon name="heart" style={styleHeart} onPress={() => { handleFavorite(team._id, team.car_id) }} />}
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