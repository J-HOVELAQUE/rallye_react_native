import React, { useEffect, useState } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, CardItem, Text, Right, Left, Body } from 'native-base';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import { greyDarkTa, redTa, whiteTa } from '../components/rallye-lib';
import { namePilot, flagNationality } from '../tools/toolkit';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';

function CardTeam({
    infoTeam,   /// with following attributes : {_id, car_id, pilot_1, pilot_2, car}
    userFavorites,  /// with following attributes {token, status}
    /// Redux
    userConnected,
    removeFavoriteTeam,
    addFavoriteTeam,
    recordClickedTeam,
    ///
    nav,
}) {

    const [styleHeart, setStyleHeart] = useState({ color: greyDarkTa })

    //// lighting the heart picto if this team is in favorites list of the user ////
    useEffect(() => {
        const inFavorites = userFavorites.filter(fav => fav._id === infoTeam._id);
        if (inFavorites.length > 0) {
            setStyleHeart({ color: redTa })
        } else {
            setStyleHeart({ color: greyDarkTa })
        }
    }, [userFavorites])

    const handleFavorite = async (numTeam, bib) => {

        const filteredFav = userFavorites.filter(fav => fav._id === numTeam);

        //// Add or Remove this team from my favorites ////
        if (filteredFav.length < 1) {
            addFavoriteTeam({
                _id: numTeam,
                car_id: bib
            })
            setStyleHeart({ color: redTa })

            // Add new favorite in BDD
            await fetch(`${serverUrl}/user/add-favorite`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${userConnected.token}&newValue=${numTeam}`
            })


        } else {
            removeFavoriteTeam(numTeam)
            setStyleHeart({ color: greyDarkTa })

            // Remove favorite in BDD
            await fetch(`${serverUrl}/user/remove-favorite`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${userConnected.token}&valueToRemove=${numTeam}`
            })
        }
    }

    return (
        <Card style={{ width: "100%", flex: 1 }} >
            <TouchableHighlight onPress={() => {
                nav.navigate('Detail');
                recordClickedTeam(infoTeam)
            }}>

                <CardItem >
                    <Left style={{ marginHorizontal: -15 }}>
                        <Text style={{
                            fontFamily: 'Roboto_700Bold',
                            fontSize: 20,
                            color: whiteTa,
                            textAlign: 'center',
                            width: 65,
                            backgroundColor: redTa,
                            paddingVertical: 5,
                            marginLeft: 15
                        }}>
                            #{infoTeam.car_id}
                        </Text>
                    </Left>

                    {/* //// PILOTS //// */}
                    <Body style={{ justifyContent: 'center', marginHorizontal: 0 }}>

                        <Text style={{ fontSize: 12, paddingHorizontal: 5 }}>
                            <Image source={{ uri: flagNationality(infoTeam.pilot_1.nationality) }}
                                style={{ height: 10, width: 15 }} />
                            {namePilot(infoTeam.pilot_1.firstname, infoTeam.pilot_1.name)}
                        </Text>

                        <Text></Text>

                        <Text style={{ fontSize: 12, paddingHorizontal: 5 }}>
                            <Image source={{ uri: flagNationality(infoTeam.pilot_2.nationality) }}
                                style={{ height: 10, width: 15 }} />
                            {namePilot(infoTeam.pilot_2.firstname, infoTeam.pilot_2.name)}
                        </Text>

                    </Body>

                    <Image source={{ uri: infoTeam.car.image }} style={{ height: 70, width: 90, flex: 1 }} />

                    <Right style={{
                        alignItems: 'center',
                        marginHorizontal: -25,
                        paddingLeft: 5
                    }}>
                        {userConnected.status === undefined ?
                            <Icon /> :
                            <Icon name="heart"
                                size={25}
                                style={styleHeart}
                                onPress={() => { handleFavorite(infoTeam._id, infoTeam.car_id) }} />}
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