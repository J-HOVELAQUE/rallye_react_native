import React, { useState } from 'react';
import { Header, Content, Button, Icon, Card, CardItem, Text, Right, Left, Body } from 'native-base';
import { View, StyleSheet, ImageBackground, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux'


function CardTeam(props) {

    console.log('COMPONENT : ', props.userConnected.status)
    const [styleHeart, setStyleHeart] = useState({ color: 'gray' })
    console.log("my favoris : ", props.userFavorites)

    const handleFavorite = (numTeam) => {
        console.log('team cliquée', numTeam)
        let index = props.userFavorites.indexOf(numTeam)

        // Add or Remove this team from my favorites
        if (index < 0) {
            props.addFavoriteTeam(numTeam)
            setStyleHeart({ color: 'red' })
        } else {
            props.removeFavoriteTeam(numTeam)
            setStyleHeart({ color: 'gray' })
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
                    {props.userConnected.status === undefined ? <Icon /> : <Icon name="heart" style={styleHeart} onPress={() => { handleFavorite('001') }} />}
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