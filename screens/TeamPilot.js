import React from 'react';
import { Header, Content, Button, Card, CardItem, Text, Right, Left, Body, Title, Container } from 'native-base';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';

import { RedButtonLogin, RedButton, RallyeH1, RallyeH2, RallyeH3, greyDarkTa, whiteTa, icoWhite, blackTa, ProfilAvatar, greyLightTa } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Team(props) {

  return (

    <Container>
      <Header style={{ backgroundColor: greyDarkTa }}>
        <Left>
          <Icon name='bars' size='25x' style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
        </Left>

        <Body>
          <Text style={{ color: whiteTa }}>AFFICHER LE NUMERO DE COURSE DE L'EQUIPAGE ?</Text>
        </Body>

        <Right>
          <Icon name='user-circle' size='25x' style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
        </Right>
      </Header>

      <Content>

        <View style={{ alignItems: "center" }}>
          <Card style={{ width: "90%", flex: 1, }}>
            <CardItem >

              <Text>#001</Text>

            </CardItem>
            <CardItem>
              <Image source={require('../assets/206.jpg')} style={{ height: 200, width: null, flex: 1 }} />
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  <Image source={require('../assets/flag-french.png')} style={{ height: 10, width: 10, flex: 1 }} />
                  Pilote 1</Text>
                <Text></Text>
                <Text>
                  <Image source={require('../assets/flag-french.png')} style={{ height: 10, width: 10, flex: 1 }} />
                  Pilote 2</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ullamcorper lectus turpis, et lacinia arisi, in congue metus tincidunt vel. Fusce ullamcorper ligula mi. Praesent placerat, nibh non posuere eleifende maximus nunc at interdt sodales purus.</Text>
            </CardItem>
            <CardItem>
              <Left>
                <Icon name="heart" />
              </Left>

              <Right>
                <Icon name="locate" onPress={() => props.navigation.navigate('Map')} />
              </Right>
            </CardItem>
          </Card>
        </View>


      </Content>

    </Container>

  );
}


