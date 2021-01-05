import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { Text, Content, Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import { RedButton, RallyeH2, greyDarkTa, redTa } from '../components/rallye-lib';
import { fullNamePilot, flagNationality } from '../tools/toolkit';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';

function DetailTeamScreen(props) {

    const team = props.clickedTeam;
    const [styleHeart, setStyleHeart] = useState({ color: greyDarkTa });
    const [displayLiveButton, setDisplayLiveButton] = useState(false);

    useEffect(() => {

        /// Check if this team is in favories list of the user for ligthing the heart or not ///
        const inFavorites = props.userFavorites.filter(fav => fav._id === props.clickedTeam._id);
        if (inFavorites.length > 0) {
            setStyleHeart({ color: redTa });
            setDisplayLiveButton(true);
        } else {
            setStyleHeart({ color: greyDarkTa })
        }
    }, [props.userFavorites])

    const handleFavorite = async (numTeam, bib) => {

        const filteredFav = props.userFavorites.filter(fav => fav._id === numTeam);

        // Add or Remove this team from my favorites
        if (filteredFav.length < 1) {

            // Adding //
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
            // Remove //
            props.removeFavoriteTeam(numTeam);
            setStyleHeart({ color: greyDarkTa });

            // Remove favorite in BDD
            await fetch(`${serverUrl}/user/remove-favorite`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.userConnected.token}&valueToRemove=${numTeam}`
            })
        }
    }


    return (
        <Container>
            <Content>
                <View style={{
                    flex: 1,
                    color: redTa,
                    alignContent: 'center',
                    alignItems: 'center'
                }}>

                    <Text >{props.userConnected.status === undefined ?
                        <Icon />
                        :
                        <Icon name="heart" size={25} style={styleHeart} onPress={() => {
                            handleFavorite(team._id);
                            setDisplayLiveButton(!displayLiveButton)
                        }} />}
                    </Text>

                    <Text style={{
                        fontFamily: 'Roboto_700Bold',
                        fontSize: 35,
                        color: redTa,
                    }}>
                        #{team.car_id}
                    </Text>

                    <Text style={{
                        fontFamily: 'Roboto_700Bold',
                        fontSize: 20,
                        color: greyDarkTa,
                    }}>
                        {team.car.brand}
                    </Text>

                    <Text style={{
                        fontFamily: 'Roboto_700Bold',
                        fontSize: 20,
                        color: greyDarkTa,
                    }}>
                        {team.car.model} - {team.car.year}
                    </Text>

                    <Text>
                        <Image source={{ uri: flagNationality(team.pilot_1.nationality) }}
                            style={{ height: 10, width: 15 }} />
                        {fullNamePilot(team.pilot_1.firstname, team.pilot_1.name)}
                    </Text>

                    <Text>
                        <Image source={{ uri: flagNationality(team.pilot_2.nationality) }}
                            style={{ height: 10, width: 15 }} />
                        {fullNamePilot(team.pilot_2.firstname, team.pilot_2.name)}
                    </Text>

                    <Image source={{ uri: team.car.image }}
                        style={{ height: 220, width: '100%', marginBottom: 10 }} />

                    <RallyeH2 text='Historique' />
                    <Text style={{ marginTop: 10, padding: 10 }}>
                        {team.car.description}
                    </Text>

                    <RedButton
                        onPress={() => {
                            props.navigation.navigate('Teams');
                            props.navigation.navigate('Classement')
                        }}
                        title="Classement"
                        style={{ flex: 1, alignItems: 'flex-end' }} />

                    {/* LIVE MAP UNIQUEMENT SI DANS FAVORIS */}

                    {displayLiveButton ?
                        <RedButton title="Live Map"
                            onPress={() => {
                                props.navigation.navigate('Teams');
                                props.navigation.navigate('Live')
                            }} /> : null}

                </View>
            </Content>
        </Container>
    )
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
        userConnected: state.userConnected,
        clickedTeam: state.clickedTeam
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailTeamScreen);