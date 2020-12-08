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
        </Footer>
      </Container>
    );
  }
}
function MenuScreen ({navigation}){}

