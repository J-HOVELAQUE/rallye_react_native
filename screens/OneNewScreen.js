import React, { useState, useEffect } from 'react';
import { Header, Content, Button, Card, CardItem, Right, Left, Body, Container, Footer, FooterTab, Thumbnail, Text, } from 'native-base';
import { View, Image, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

// Importer la librairie de composants
import { RallyeH1, RallyeH3, greyDarkTa, whiteTa, icoWhite, redTa } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.14:3000';

function NewsScreen(props) {

    const [newsList, setNewsList] = useState([])

    useEffect(() => {

        console.log('NEWS CLICKED >>>>>>>>>>>>>', props.news);
    }, [])

    return (
        <Container>

            <Header style={{ backgroundColor: greyDarkTa }}>
                <Left>
                    <Icon name='bars' size={25} style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
                </Left>

                <Body>
                    <Text style={{ color: whiteTa }}>NEWS</Text>
                </Body>

                <Right>
                    {props.user.status === undefined ?
                        <Icon name='user-circle' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
                        :
                        <Icon name='sign-out' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { AsyncStorage.clear(); props.resetUserConnected(); props.navigation.navigate('Home') }} />
                    }
                </Right>
            </Header>

            <Content>
                <Text>NEWS</Text>

            </Content>

            <Footer>
                <FooterTab style={{ backgroundColor: greyDarkTa, }}>
                    <Button onPress={() => props.navigation.navigate('Accueil')}>
                        <Icon name='home' size={20} style={{ color: whiteTa }} />
                        <Text style={{ color: whiteTa, fontSize: 9.5 }}>Accueil</Text>
                    </Button>
                    <Button onPress={() => props.navigation.navigate('Pilotes')} >
                        <Icon name='car' size={20} style={{ color: whiteTa }} />
                        <Text style={{ color: whiteTa, fontSize: 9.5 }}>Pilotes</Text>
                    </Button>
                    <Button onPress={() => props.navigation.navigate('Classement')}>
                        <Icon name='trophy' size={20} style={{ color: whiteTa }} />
                        <Text style={{ color: whiteTa, fontSize: 9.5 }}>Résultats</Text>
                    </Button >
                    <Button onPress={() => props.navigation.navigate('Live')}>
                        <Icon name='map' size={20} style={{ color: whiteTa }} />
                        <Text style={{ color: whiteTa, fontSize: 9.5 }}>Map</Text>
                    </Button>
                    <Button onPress={() => props.navigation.navigate('Medias')}>
                        <Icon name='image' size={20} style={{ color: whiteTa }} />
                        <Text style={{ color: whiteTa, fontSize: 9.5 }}>Medias</Text>
                    </Button>
                </FooterTab>
            </Footer>

        </Container>
    )

}


function mapStateToProps(state) {
    return {
        userFavorites: state.userFavorites,
        user: state.userConnected,
        news: state.clickedNews
    }
}


function mapDispatchToProps(dispatch) {
    return {
        resetUserConnected: function () {
            dispatch({
                type: 'reset'
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsScreen);