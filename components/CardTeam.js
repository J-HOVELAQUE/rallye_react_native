import React, { useEffect, useState } from 'react';
import { View, Image, TouchableHighlight, ScrollView, } from 'react-native';
import { Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, CardItem, Text, Right, Left, Body } from 'native-base';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';


import { RedButton, RallyeH2, greyDarkTa, redTa } from '../components/rallye-lib';
import { namePilot, fullNamePilot, flagNationality } from '../tools/toolkit';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';

function CardTeam(props) {

    const [styleHeart, setStyleHeart] = useState({ color: greyDarkTa })

    const team = props.infoTeam;

    useEffect(() => {
        const inFavorites = props.userFavorites.filter(fav => fav._id === props.infoTeam._id);
        if (inFavorites.length > 0) {
            setStyleHeart({ color: redTa })
        } else {
            setStyleHeart({ color: greyDarkTa })
        }
    }, [props.userFavorites])

    const handleFavorite = async (numTeam, bib) => {

        const filteredFav = props.userFavorites.filter(fav => fav._id === numTeam);

        // Add or Remove this team from my favorites
        if (filteredFav.length < 1) {
            props.addFavoriteTeam({
                _id: numTeam,
                car_id: bib
            })
            setStyleHeart({ color: redTa })

            // Add new favorite in BDD
            await fetch(`${serverUrl}/user/add-favorite`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.userConnected.token}&newValue=${numTeam}`
            })


        } else {
            props.removeFavoriteTeam(numTeam)
            setStyleHeart({ color: greyDarkTa })

            // Remove favorite in BDD
            await fetch(`${serverUrl}/user/remove-favorite`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.userConnected.token}&valueToRemove=${numTeam}`
            })
        }
    }

    return (
        <Card style={{ width: "100%", flex: 1 }} >
            <TouchableHighlight onPress={() => {
                props.nav.navigate('Detail');
                props.recordClickedTeam(props.infoTeam)
            }}>

                <CardItem >
                    <Left style={{ marginHorizontal: -10 }}>
                        <Text style={{ fontFamily: 'Roboto_700Bold', fontSize: 20, color: greyDarkTa, textAlign: 'left', }}>#{team.car_id}</Text>
                    </Left>
                    <Body style={{ justifyContent: 'center', marginHorizontal: 0 }}>
                        <Text style={{ fontSize: 12, paddingHorizontal: 5 }}>
                            <Image source={{ uri: flagNationality(team.pilot_1.nationality) }} style={{ height: 10, width: 15 }} />
                            {namePilot(team.pilot_1.firstname, team.pilot_1.name)}</Text>
                        <Text></Text>
                        <Text style={{ fontSize: 12, paddingHorizontal: 5 }}>
                            <Image source={{ uri: flagNationality(team.pilot_2.nationality) }} style={{ height: 10, width: 15 }} />
                            {namePilot(team.pilot_2.firstname, team.pilot_2.name)}</Text>
                    </Body>

                    <Image source={{ uri: team.car.image }} style={{ height: 70, width: 90, flex: 1 }} />
                    <Right style={{ alignItems: 'center', marginHorizontal: -20 }}>
                        {props.userConnected.status === undefined ? <Icon /> : <Icon name="heart" size={25} style={styleHeart} onPress={() => { handleFavorite(team._id, team.car_id) }} />}
                    </Right>
                </CardItem>
            </TouchableHighlight>

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
        },
        recordClickedTeam: function (team) {
            dispatch({
                type: 'record-team',
                team
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

const CardTeamAndRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(CardTeam);

export default withNavigationFocus(CardTeamAndRedux);