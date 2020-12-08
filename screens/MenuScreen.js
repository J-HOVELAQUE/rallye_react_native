import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Accordion } from 'native-base';
import { View, Text, StyleSheet } from 'react-native';

const dataArray = [
  { title: "Hebergement", content: "Lorem ipsum dolor sit amet" },
  { title: "Restauration", content: "Lorem ipsum dolor sit amet" },
  { title: "Navette", content: "Lorem ipsum dolor sit amet" }
];

export default class test extends Component {
  render() {
    return (
      <Container>
        <Header>
              <Icon onPress={() => this.props.navigation.openDrawer()}style={{color:'white'}}name="home" />
        </Header>
        <Content>
          <Accordion
            dataArray={dataArray}
            icon="add"
            expandedIcon="remove"
            iconStyle={{ color: "black" }}
            expandedIconStyle={{ color: "red" }}
          />


        </Content>
        <Footer>
          <FooterTab style={{backgroundColor: '#313131',}}>
            <Button onPress={() => this.props.navigation.navigate('Home')}>
              <Icon style={{color:'white'}} name="home" />
              <Text style={{color:'white'}}>Home</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Team')}>
              <Icon style={{color:'white'}} name="car" />
              <Text style={{color:'white'}}>Team</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Classement')}>
              <Icon style={{color:'white'}} name="add" />
              <Text style={{color:'white'}}>Podium</Text>
            </Button >
            <Button onPress={() => this.props.navigation.navigate('Map')}>
              <Icon style={{color:'white'}}name="map" />
              <Text style={{color:'white'}}>Map</Text>
            </Button>
            <Button onPress={() => this.props.navigation.openDrawer()}>
            <Icon style={{color:'white'}}name="menu"  />
            <Text style={{color:'white'}}>Menu</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
function MenuScreen ({navigation}){}

