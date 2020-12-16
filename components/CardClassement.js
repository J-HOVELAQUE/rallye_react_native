import React, { useEffect, useState } from 'react';
import { Header, Content, Button, Card, CardItem, Text, Right, Left, Body } from 'native-base';
import { View, StyleSheet, ImageBackground, Image, TouchableHighlight, ScrollView, ScrollViewComponent, ScrollViewBase } from 'react-native';
import { Overlay } from 'react-native-elements';
import { connect } from 'react-redux'

import { RedButtonOutline, RedButton, RallyeH1, RallyeH2, RallyeH3, greyDarkTa, redTa, whiteTa, icoWhite, blackTa, ProfilAvatar, greyLightTa, SearchInput, EmailInput } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    const team = props.infoTeam

    useEffect(() => {
        const inFavorites = props.userFavorites.filter(fav => fav._id === props.infoTeam._id);
        if (inFavorites.length > 0) {
            setStyleHeart({ color: redTa })
        }
    }, [])

    const handleFavorite = async (numTeam, bib) => {
        console.log('team cliquée', numTeam)

        const filteredFav = props.userFavorites.filter(fav => fav._id === numTeam);

        // Add or Remove this team from my favorites
        if (filteredFav.length < 1) {
            props.addFavoriteTeam({
                _id: numTeam,
                car_id: bib
            })
            setStyleHeart({ color: redTa })

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
            setStyleHeart({ color: greyDarkTa })

            // Remove favorite in BDD
            const rawAnswer = await fetch(`${serverUrl}/user/remove-favorite`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.userConnected.token}&valueToRemove=${numTeam}`
            })
        }
    }


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

    // function msConversion(millis) {
    //     let sec = Math.floor(millis / 1000);
    //     let hrs = Math.floor(sec / 3600);
    //     sec -= hrs * 3600;
    //     let min = Math.floor(sec / 60);
    //     sec -= min * 60;

    //     sec = '' + sec;
    //     sec = ('00' + sec).substring(sec.length);

    //     if (hrs > 0) {
    //       min = '' + min;
    //       min = ('00' + min).substring(min.length);
    //       return hrs + ":" + min + ":" + sec;
    //     }
    //     else {
    //       return min + ":" + sec;
    //     }
    // }

    // console.log('INFO //// : ', team)

    return (
        <Card style={{ width: "100%", flex: 1 }}>
            <CardItem >
                <Left>
                    <Text style={{ fontFamily: 'Roboto_700Bold', fontSize: 20, color: greyDarkTa, textAlign: 'left', }}>#{team.car_id}</Text>
                </Left>
                <Body>
                    <Text style={{ fontSize: 10 }}>
                        <Image source={{ uri: flagNationality(team.pilot_1.nationality) }} style={{ height: 10, width: 15 }} />
                        {namePilot(team.pilot_1.firstname, team.pilot_1.name)}</Text>
                    <Text></Text>
                    <Text style={{ fontSize: 10 }}>
                        <Image source={{ uri: flagNationality(team.pilot_2.nationality) }} style={{ height: 10, width: 15 }} />
                        {namePilot(team.pilot_2.firstname, team.pilot_2.name)}</Text>
                </Body>

                

                
                <Right style={{ alignItems: 'center' }}>
                    <Text>2:15:51.0</Text>
                    <Text note>+12</Text>
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