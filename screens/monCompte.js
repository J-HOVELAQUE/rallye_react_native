import React, { useState } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Left, Body, Title, Right, Image } from 'native-base';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Input, Overlay } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux'

import { RedButtonLogin, RedButton, RallyeH1, RallyeH2, RallyeH3, greyDarkTa, whiteTa, icoWhite, blackTa, ProfilAvatar, greyLightTa } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';

function monCompteScreen(props) {

  // console.log("COMPTE ///// :", props.userConnected)
  const user = props.userConnected

  const [visible, setVisible] = useState(false);

  const [overlayProfile, setOverlayProfile] = useState(() =>
    x => (
      <Overlay isVisible={visible} onBackdropPress={() => { toggleOverlay() }}>
        <View>
          <Text>{x}</Text>
          <Button onPress={() => { toggleOverlay() }} >
            <Text>OK</Text>
          </Button>
        </View>

      </Overlay>
    )
  )

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  // const handleEditProfil = () => {
  //   toggleOverlay()
  // }

  // const overlayProfile = () => {

  //   return (
  //     <Overlay isVisible={visible} onBackdropPress={() => { toggleOverlay() }}>
  //       <View>
  //         <Text>OKProfile</Text>
  //         <Button onPress={() => { toggleOverlay() }} >
  //           <Text>OK</Text>
  //         </Button>
  //       </View>

  //     </Overlay>
  //   )
  // }

  return (
    <Container >

      <Header style={{ backgroundColor: greyDarkTa }}>
        <Left>
          <Icon name='bars' size='25x' style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
        </Left>

        <Body>
          <Text style={{ color: whiteTa }}>MON COMPTE</Text>
        </Body>

        <Right>
          <Icon name='user-circle' size='25x' style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
        </Right>
      </Header>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{overlayProfile(10)}</Text>

        <Text>Avatar: {user.avatar !== undefined ? user.nationality : 'non renseignée'}</Text>
        <Button onPress={() => { toggleOverlay() }}><Text>Changer mon avatar</Text></Button>

        <Text>Prenom: {user.firstName}</Text>
        <Button><Text>Editer mon prénom</Text></Button>

        <Text>Nom: {user.lastName}</Text>
        <Button><Text>Editer mon nom de famille</Text></Button>

        <Text>Nationalité: {user.nationality !== undefined ? user.nationality : 'non renseignée'}</Text>
        <Button><Text>Changer ma nationalité</Text></Button>

        <Text>Email: {user.email}</Text>
        <Button><Text>Editer mon email</Text></Button>

        <Button><Text>Changer mon mot de passe</Text></Button>

      </View>

      <Footer>
        <FooterTab style={{ backgroundColor: greyDarkTa, }}>
          <Button onPress={() => props.navigation.navigate('Home')}>
            <Icon name='tachometer' size='20x' style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Rallye</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Teams')} >
            <Icon name='car' size='20x' style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Pilotes</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Classement')}>
            <Icon name='trophy' size='20x' style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Résultats</Text>
          </Button >
          <Button onPress={() => props.navigation.navigate('Map')}>
            <Icon name='map' size='20x' style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Map</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Medias')}>
            <Icon name='image' size='20x' style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Medias</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})


function mapStateToProps(state) {
  return {
    userFavorites: state.userFavorites,
    userConnected: state.userConnected
  }
}

export default connect(
  mapStateToProps,
  null
)(monCompteScreen);