import React, { useEffect, useState } from 'react';
import { Header, Content, Button, Card, CardItem, Text, Right, Left, Body } from 'native-base';
import { View, StyleSheet, ImageBackground, Image, TouchableHighlight, ScrollView, ScrollViewComponent, ScrollViewBase } from 'react-native';
import { connect } from 'react-redux'

import { RedButtonOutline, RedButton, RallyeH1, RallyeH2, RallyeH3, greyDarkTa, redTa, whiteTa, icoWhite, blackTa, ProfilAvatar, greyLightTa, SearchInput, EmailInput } from '../components/rallye-lib';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.9:3000';

function CardClassement(props) {

    const [styleHeart, setStyleHeart] = useState({ color: greyDarkTa })
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };
    const urlFlagFRA = 'https://res.cloudinary.com/dibl3ihpy/image/upload/v1607678236/France_m9qlcw.png'
    const urlFlagCHE = 'https://res.cloudinary.com/dibl3ihpy/image/upload/v1607678236/Suisse_njyljk.png'
    const urlFlagWorld = 'https://res.cloudinary.com/dibl3ihpy/image/upload/v1608020160/world_pxx0mb.png'

    useEffect(() => {
        const inFavorites = props.userFavorites.filter(fav => fav._id === props.infoTeam._id);
        if (inFavorites.length > 0) {
            setStyleHeart({ color: redTa })
        }
    }, [])


    function namePilot(firstName, lastName) {
        if (typeof firstName === "string" && typeof lastName === "string") {
            return (firstName[0].toUpperCase() + '. ' + lastName.toUpperCase())
        } else {
            return ""
        }
    }

    function fullNamePilot(firstName, lastName) {
        if (typeof firstName === "string" && typeof lastName === "string") {
            return (firstName[0].toUpperCase() + firstName.substring(1) + ' ' + lastName.toUpperCase())
        } else {
            return ""
        }
    }

    function flagNationality(nationality) {
        if (nationality === 'fra') {
            return urlFlagFRA
        } else if (nationality === 'che') {
            return urlFlagCHE
        } else {
            return urlFlagWorld
        }
    }

    return (
        <Card style={{ width: "100%", flex: 1 }}>
            <CardItem >
                <Left style={{marginHorizontal: -10}}>
                    <Text style={{ fontFamily: 'Roboto_700Bold', fontSize: 20, color: whiteTa, textAlign: 'center', backgroundColor: redTa, paddingHorizontal: 10, paddingVertical: 5 }}>{props.position}</Text>
                    <Text style={{ fontFamily: 'Roboto_700Bold', fontSize: 20, color: greyDarkTa, textAlign: 'right', paddingHorizontal: 10 }}>#{props.infoTeam.car_id}</Text>
                </Left>
                <Body style={{justifyContent: 'center', marginHorizontal: -30}}>
                    <Text style={{ fontSize: 12, paddingHorizontal: 5 }}>
                        <Image source={{ uri: flagNationality(props.infoTeam.pilot_1.nationality) }} style={{ height: 10, width: 15 }} />
                        {namePilot(props.infoTeam.pilot_1.firstname, props.infoTeam.pilot_1.name)}</Text>

                    <Text style={{ fontSize: 12, paddingHorizontal: 5 }}>
                        <Image source={{ uri: flagNationality(props.infoTeam.pilot_2.nationality) }} style={{ height: 10, width: 15 }} />
                        {namePilot(props.infoTeam.pilot_2.firstname, props.infoTeam.pilot_2.name)}</Text>
                </Body>

                <Right style={{ alignItems: 'center', marginHorizontal: -25 }}>
                    <Text>{props.time}</Text>
                    <Text note>{props.diff}</Text>
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
)(CardClassement);