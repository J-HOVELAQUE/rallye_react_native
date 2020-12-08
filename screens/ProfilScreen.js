import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Accordion } from 'native-base';
import { View, Text, StyleSheet } from 'react-native';



export default function ProfilScreen(props) {

  return (
    <Container style={{ backgroundColor: 'pink' }}>
      <Header>
        <Button onPress={() => props.navigation.openDrawer()}>
          <Icon name='menu' style={{ color: 'white' }} />

        </Button>
      </Header>

      <Content>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: "red" }}>Page Profil</Text>
        </View>


      </Content>
      <Footer>
        <FooterTab style={{ backgroundColor: '#313131', }}>
          <Button onPress={() => props.navigation.navigate('Home')}>
            <Icon style={{ color: 'white' }} name="home" />
            <Text style={{ color: 'white' }}>Home</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Team')}>
            <Icon style={{ color: 'white' }} name="car" />
            <Text style={{ color: 'white' }}>Team</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Classement')}>
            <Icon style={{ color: 'white' }} name="add" />
            <Text style={{ color: 'white' }}>Podium</Text>
          </Button >
          <Button onPress={() => props.navigation.navigate('Map')}>
            <Icon style={{ color: 'white' }} name="map" />
            <Text style={{ color: 'white' }}>Map</Text>
          </Button>
          <Button onPress={() => props.navigation.openDrawer()}>
            <Icon style={{ color: 'white' }} name="menu" />
            <Text style={{ color: 'white' }}>Menu</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}
