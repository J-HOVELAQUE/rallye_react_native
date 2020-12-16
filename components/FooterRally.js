import React, { useEffect, useState } from 'react';

import { greyDarkTa, whiteTa, RallyeH3 } from '../components/rallye-lib';
import { Text, View } from 'react-native';

import { Container, Content, Footer, FooterTab, Button, Accordion } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

function FooterRally(props) {

    return (
        <Footer>
            <FooterTab style={{ backgroundColor: greyDarkTa, }}>
                <Button onPress={() => props.nav('Accueil')}>
                    <Icon name='home' size={20} style={{ color: whiteTa }} />
                    <Text style={{ color: whiteTa, fontSize: 9.5 }}>Accueil</Text>
                </Button>
                <Button onPress={() => props.nav('Pilotes')} >
                    <Icon name='car' size={20} style={{ color: whiteTa }} />
                    <Text style={{ color: whiteTa, fontSize: 9.5 }}>Pilotes</Text>
                </Button>
                <Button onPress={() => props.nav('Classement')}>
                    <Icon name='trophy' size={20} style={{ color: whiteTa }} />
                    <Text style={{ color: whiteTa, fontSize: 9.5 }}>Résultats</Text>
                </Button >
                <Button onPress={() => props.nav('Live')}>
                    <Icon name='map' size={20} style={{ color: whiteTa }} />
                    <Text style={{ color: whiteTa, fontSize: 9.5 }}>Map</Text>
                </Button>
                <Button onPress={() => props.nav('Medias')}>
                    <Icon name='image' size={20} style={{ color: whiteTa }} />
                    <Text style={{ color: whiteTa, fontSize: 9.5 }}>Medias</Text>
                </Button>
            </FooterTab>
        </Footer>
    )
}

export default FooterRally;