import React from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { Text, Container, Header, Content, Footer, FooterTab, Button, Accordion, Left, Title, Body, Right, Card, CardItem, } from 'native-base';
import { Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


// Importer la librairie de composants
import {
    greyDarkTa, whiteTa, blackTa, redTa, greyLightTa,
    RedButton, RedButtonOutline,
    GreyButton, GreyButtonOutline,
    RallyeH1, RallyeH2, RallyeH3,
    ProfilAvatar, EditProfilAvatar,
    FacebookSocialIco, TwitterSocialIco, InstagramSocialIco, YouTubeSocialIco, LinkedinSocialIco,
    UserInput, EmailInput, PasswordInput, icoWhite
} from '../components/rallye-lib';


export default function LibraryScreen(props) {
    var nom = () => {
        console.log("HELLO");
    };

    return (
<Container>

<Header style={{ backgroundColor: greyDarkTa }}>
        <Left>
          <Icon name='bars' size={25} style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
        </Left>

        <Body>
          <Text style={{ color: whiteTa }}>LIBRAIRIE &amp; STYLES</Text>
        </Body>

        <Right>
          <Icon name='user-circle' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate() }} />
        </Right>
      </Header>

        <View style={{ flex: 1, backgroundColor: '', alignItems: "center" }}><Text>Librairie</Text>
            <ScrollView>
                <Text style={{ color: 'white' }}>Librairie composants</Text>

                <Text style={{ textTransform: 'uppercase', textAlign: 'center' }}>Les boutons :</Text>
                <RedButton onPress={() => { nom() }} title="Bouton A" />
                <RedButtonOutline onPress={() => { nom() }} title="Bouton AB" />
                <GreyButton onPress={() => { nom() }} title="Bouton B" />
                <GreyButtonOutline onPress={() => { nom() }} title="Bouton BC" />

                <Divider style={{ backgroundColor: '#000000', margin: 10, }} />

                <Text style={{ textTransform: 'uppercase', textAlign: 'center' }}>Les titres :</Text>
                <RallyeH1 text="Titre H1" />
                <RallyeH2 text="Titre H2" />
                <RallyeH3 text="Titre H3" />

                <Divider style={{ backgroundColor: '#000000', margin: 10 }} />

                <Text style={{ textTransform: 'uppercase', textAlign: 'center' }}>Avatar :</Text>
                <View style={{ flexDirection: 'row' }}>
                    {/* Taille "medium". Avatar normal pr afficher le burger menu si logué */}
                    <ProfilAvatar />
                    {/* Taille "small". Avatar avec crayon pour modifier son profil */}
                    <EditProfilAvatar />
                </View>

                <Divider style={{ backgroundColor: '#000000', margin: 10 }} />

                <Text style={{ textTransform: 'uppercase', textAlign: 'center' }}>social networks :</Text>
                <View style={{ flexDirection: 'row' }}>
                    <FacebookSocialIco />
                    <TwitterSocialIco />
                    <InstagramSocialIco />
                    <YouTubeSocialIco />
                    <LinkedinSocialIco />
                </View>

                <UserInput />
                <EmailInput />
                <PasswordInput />

            </ScrollView>
        </View>
        </Container>
    );
}

