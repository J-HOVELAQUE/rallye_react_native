import React, { useState } from 'react';
import { Header, Content, Button, Icon, Card, CardItem, Text, Right, Left, Body } from 'native-base';
import { View, StyleSheet, ImageBackground, Image, TouchableHighlight, ScrollView, ScrollViewComponent, ScrollViewBase } from 'react-native';
import { Overlay } from 'react-native-elements';
import { connect } from 'react-redux'



const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.9:3000';

function CardTeam(props) {

    const [styleHeart, setStyleHeart] = useState({ color: 'gray' })
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
        console.log(!visible)
    };
    const urlFlagFR = 'https://res.cloudinary.com/dibl3ihpy/image/upload/v1607678236/France_m9qlcw.png'
    const urlFlagCHE = 'https://res.cloudinary.com/dibl3ihpy/image/upload/v1607678236/Suisse_njyljk.png'
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

    function fullNamePilot(firstName, lastName) {
        return (firstName.substr(0, 1).toUpperCase() + firstName.substr(1) + ' ' + lastName.toUpperCase())
    }

    function flagNationality(nationality){
        if(nationality === 'fra'){
            return urlFlagFR
        } else if (nationality === 'che'){
            return urlFlagCHE
        } else {
            return urlFlagFR // Mettre un drapeau du monde
        }
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
                        <Image source={{uri: flagNationality(team.pilot_1.nationality)}} style={{ height: 10, width: 10, flex: 1 }} />
                        {namePilot(team.pilot_1.firstname, team.pilot_1.name)}</Text>
                    <Text></Text>
                    <Text style={{ fontSize: 10 }}>
                        <Image source={{uri: flagNationality(team.pilot_1.nationality)}} style={{ height: 10, width: 10, flex: 1 }} />
                        {namePilot(team.pilot_2.firstname, team.pilot_2.name)}</Text>
                </Body>

                <Overlay isVisible={visible} onBackdropPress={() => { toggleOverlay() }}>
                    <View style={{ height: '90%', width: '90%', flex: 1 }}>
                        <Image source={{ uri: team.car.image }} style={{ height: 250, width: null, flex: 1 }} />
                        <Body><Text>#{team.car_id}</Text>
                            <Text>
                                <Image source={{uri: flagNationality(team.pilot_1.nationality)}} style={{ height: 10, width: 10, flex: 1 }} />
                                {fullNamePilot(team.pilot_1.firstname, team.pilot_1.name)}</Text>
                            <Text></Text>
                            <Text>
                                <Image source={{uri: flagNationality(team.pilot_1.nationality)}} style={{ height: 10, width: 10, flex: 1 }} />
                                {fullNamePilot(team.pilot_2.firstname, team.pilot_2.name)}</Text>
                        </Body>
                        <ScrollView><Text>Lorem ips ullamcorper lectus turpis, et lacinia arisi, in congue m</Text>
                        </ScrollView>
                            {props.userConnected.status === undefined ? <Icon /> : <Icon name="heart" style={styleHeart} onPress={() => { handleFavorite(team._id) }} />}
                    
                            <Icon name="locate" onPress={() => {toggleOverlay() ; props.navigation.navigate('Map')}} />
                        
                        <Button onPress={() => { toggleOverlay() }} style={{marginTop: 10}} >
                            <Text>Revenir aux équipes</Text>
                        </Button>
                    </View>
                </Overlay>

                <TouchableHighlight onPress={() => { toggleOverlay() }}>

                    <Image source={{ uri: team.car.image }} style={{ height: 60, width: 90, flex: 1 }} />
                </TouchableHighlight>
                <Right>
                    {props.userConnected.status === undefined ? <Icon /> : <Icon name="heart" style={styleHeart} onPress={() => { handleFavorite(team._id, team.car_id) }} />}
                    <Text></Text>
                    <Icon name="locate" onPress={() => {props.navigation.navigate('Map')}} />
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