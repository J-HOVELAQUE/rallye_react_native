import React, { useState } from 'react';
import { Header, Content, Button, Icon, Card, CardItem, Text, Right, Left, Body } from 'native-base';
import { View, StyleSheet, ImageBackground, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux'


// const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
const serverUrl = 'http://192.168.1.9:3000/user/sign-up';

function CardTeam(props) {

    console.log('COMPONENT : ', props.userConnected.status)
    const [styleHeart, setStyleHeart] = useState({ color: 'gray' })
    console.log("my favoris : ", props.userFavorites)

    const handleFavorite = async (numTeam) => {
        console.log('team cliquée', numTeam)
        let index = props.userFavorites.indexOf(numTeam)

        // Add or Remove this team from my favorites
        if (index < 0) {
            props.addFavoriteTeam(numTeam)
            setStyleHeart({ color: 'red' })
            // fetch addFavorite
            const rawAnswer = await fetch(`${serverUrl}/user/add-favorite`,{
                method: 'PUT',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body: `token=${props.userConnected.token}&newValue=${numTeam}`
            })
            const answer = await rawAnswer.json();
            console.log(answer)
        } else {
            props.removeFavoriteTeam(numTeam)
            setStyleHeart({ color: 'gray' })
            // fetch removeFavorite
        }
    }


    return (
        <Card style={{ width: 350, flex: 1 }}>
            <CardItem >
                <Left>
                    <Text>#001</Text>
                </Left>
                <Body >
                    <Text>
                        <Image source={require('../assets/flag-french.png')} style={{ height: 10, width: 10, flex: 1 }} />
                  Pilote 1</Text>
                    <Text></Text>
                    <Text>
                        <Image source={require('../assets/flag-french.png')} style={{ height: 10, width: 10, flex: 1 }} />
                  Pilote 2</Text>
                </Body>
                <TouchableHighlight onPress={() => props.navigation.navigate('TeamPilot')}>
                    <Image source={require('../assets/206.jpg')} style={{ height: 60, width: 90, flex: 1 }} />
                </TouchableHighlight>
                <Right>
                    {props.userConnected.status === undefined ? <Icon /> : <Icon name="heart" style={styleHeart} onPress={() => { handleFavorite('5fd1eb2066dec526180125d1') }} />}
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