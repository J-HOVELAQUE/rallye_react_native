import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Header, Left, Body, Right } from 'native-base';
import { connect } from 'react-redux';
import { greyDarkTa, whiteTa, icoWhite } from '../components/rallye-lib';

function HeaderRally(props) {

    return (
        <Header style={{ backgroundColor: greyDarkTa }}>
            <Left>
                <Icon name='bars' size={25} style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.openBurgerMenu()} />
            </Left>

            <Body>
                <Text style={{ color: whiteTa }}>INFOS PRATIQUES</Text>
            </Body>
            <Right>

                {props.userConnected.status === undefined ?
                    <Icon name='user-circle' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.nav('Login') }} />
                    :
                    <Icon name='sign-out' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { AsyncStorage.clear(); props.resetUserConnected(); props.nav('Home') }} />
                }
            </Right>
        </Header>
    )
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

function mapStateToProps(state) {
    return {
        userConnected: state.userConnected,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderRally);
