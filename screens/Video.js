import React from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Left, Body, Title, Right, Image } from 'native-base';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

import { RedButtonLogin, RedButton, RallyeH1, RallyeH2, RallyeH3, greyDarkTa, whiteTa, icoWhite, blackTa, ProfilAvatar, greyLightTa } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';


function VideoScreen(props) {

  return (
    <Container >

      <Header style={{ backgroundColor: greyDarkTa }}>
        <Left>
          <Icon name='bars' size={25} style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
        </Left>

        <Body>
          <Text style={{ color: whiteTa }}>VIDEO</Text>
        </Body>

        <Right>
          {props.user.status === undefined ?
            <Icon name='user-circle' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
            :
            <Icon name='sign-out' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { AsyncStorage.clear(); props.resetUserConnected() ; props.navigation.navigate('Home') }} />
          }
        </Right>
      </Header>
      <ImageBackground source={require('../assets/fondCarbon.jpg')} style={styles.container}>
        <Content>

          <Video
            source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={{ width: 300, height: 300 }}
          />

        </Content>
      </ImageBackground>
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
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

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
    userFavorites: state.userFavorites,
    user: state.userConnected
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoScreen);