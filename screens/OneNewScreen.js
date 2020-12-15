import React from 'react';
import { Header, Content, Button, Card, CardItem, Right, Left, Body, Container, Footer, FooterTab, Thumbnail, Text, } from 'native-base';
import { View, Image, } from 'react-native';
import { connect } from 'react-redux';

// Importer la librairie de composants
import { RallyeH1, RallyeH2, RallyeH3, greyDarkTa, whiteTa, icoWhite, redTa } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.14:3000';

function NewsScreen(props) {

    return (
        <Container>

            <Content>
                <View style={{ width: '100%', flex: 1, marginTop: 20 }}>
                    <Body>
                        <Text style={{ fontFamily: 'Roboto_700Bold', fontSize: 20, color: greyDarkTa, }}>{props.news.title}</Text>


                        <Image source={{ uri: props.news.image }} style={{ height: 220, width: 300, marginBottom: 10, flex: 1 }} />

                        <Text style={{ marginTop: 10 }}>{props.news.description}</Text>

                    </Body>
                </View>

            </Content>

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