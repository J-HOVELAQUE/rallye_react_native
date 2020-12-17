import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { Text, Container, Content, Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import HeaderRally from '../components/HeaderRally';
import FooterRally from '../components/FooterRally';

import { RedButton, RallyeH1, RallyeH2, greyDarkTa, blackTa, greyLightTa } from '../components/rallye-lib';
import { getData, schedule } from '../tools/toolkit';


const serverUrl = 'https://powerful-earth-91256.herokuapp.com';

function HomeScreen(props) {

    const [program, setProgram] = useState([]);
    const [welcome, setWelcome] = useState('HOME');

    useEffect(() => {
        const connection = async () => {
            //// Getting data in local storage if existing ////
            const answer = await getData();

            //// Record user connected on the reduce store /////
            props.onRecordUserConnected(answer.user);
            const favorite = answer.user.favorite.map(fav => {
                const returnOb = {};
                returnOb._id = fav._id;
                returnOb.car_id = fav.car_id;
                return returnOb;
            })
            props.retrieveFavoriteTeam(favorite);
        }

        //// Retrieve program info from DB ////
        async function getProgram() {
            const rawAnswer = await fetch(`${serverUrl}/program/get-program`, {
                method: 'GET',
            });
            let program = await rawAnswer.json();
            setProgram([program.program[0], program.program[1], program.program[2]]);
        }

        connection();
        getProgram();
        if (props.user.lastName !== null && props.user.lastName !== "" && props.user.lastName !== undefined) {
            setWelcome("Bonjour " + props.user.firstName);
        }
    }, [props.userConnected])

    let programGrid = program.map((planning, i) => (
        <Card key={planning._id} style={{ width: "100%", flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
            <CardItem >

                <Text style={{ fontFamily: 'Roboto_700Bold', fontSize: 20, color: greyDarkTa, textAlign: 'left', marginRight: 20 }}>{schedule(planning.date)}</Text>

                <View style={{ width: '75%' }}>
                    {planning.event.map((task) => (
                        <Text key={task}>- {task}</Text>
                    ))}

                </View>

            </CardItem>
        </Card>
    ))

    return (
        <Container>

            <HeaderRally openBurgerMenu={props.navigation.openDrawer}
                nav={props.navigation.navigate}
                titleHeader={welcome} />

            <Content >

                <View style={{ marginLeft: 10 }}>
                    <RallyeH1 text="ETAPE 4 : VENDREDI 18 DEC." />
                    <Text><Icon name='flag' /> <RallyeH2 style={{ margin: 20 }} text="VERS-PONT-DU-GARD" /></Text>
                    <Text><Icon name='flag-checkered' /> <RallyeH2 text="CIRCUIT PAUL RICARD" /></Text>
                    <Text style={{ marginTop: 10, color: greyLightTa }}>Aujourd'hui, avant dernière étape du rallye qui partira de Vers-Pont-du-Gard et se terminera au circuit Paul Ricard. Un parcours de plus de 350 km !</Text>
                </View>

                <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
                    <RallyeH1 text="PROGRAMME DU JOUR" />
                    <Text style={{ marginBottom: 10, color: greyLightTa }}>Horaires de départ des premières voitures</Text>
                    {programGrid}
                </View>

                <View style={{ marginHorizontal: 10 }}>
                    <RedButton onPress={() => props.navigation.navigate('Programme')} title="Programme en détail" style={{ flex: 1, alignItems: 'flex-end' }} />
                </View>

                <View style={{ marginHorizontal: 10 }}>
                    <RallyeH1 text="ITINERAIRE" />
                    <Image source={require('../assets/testmap.jpg')} style={{ height: 180, borderColor: blackTa }} />
                    <RedButton onPress={() => props.navigation.navigate('Map')} title="Live" style={{ flex: 1, alignItems: 'flex-end' }} />
                </View>
            </Content>
            <FooterRally nav={props.navigation.navigate} />
        </Container >
    );
}

function mapDispatchToProps(dispatch) {
    return {
        onRecordUserConnected: function (user) {
            dispatch({
                type: 'record',
                user: user
            })
        },
        resetUserConnected: function () {
            dispatch({
                type: 'reset'
            })
        },
        retrieveFavoriteTeam: function (listFavorites) {
            dispatch({
                type: 'retrieveFavoriteTeam',
                listFavorites: listFavorites
            })
        }
    }
}

function mapStateToProps(state) {
    return {
        favorites: state.userFavorites,
        user: state.userConnected
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);