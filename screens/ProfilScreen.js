import React from 'react';
import { Header, Content, Button, Card, CardItem, Right, Left, Body, Container, Footer, FooterTab, Title } from 'native-base';
import { View, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { greyDarkTa, whiteTa, icoWhite } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function ProfilScreen(props) {

  return (
    <Container style={{ backgroundColor: 'black' }}>
      <Header style={{ backgroundColor: greyDarkTa }}>
        <Left>
          <Icon name='bars' size='25x' style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
        </Left>

        <Body>
          <Text style={{ color: whiteTa }}>MON PROIL</Text>
        </Body>

        <Right>
          <Icon name='user-circle' size='25x' style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
        </Right>
      </Header>



      <Content >

        <Card style={{ width: 350, flex: 1 }}>
          <CardItem >

            <Text>Numéro équipe #001</Text>

          </CardItem>
          <CardItem>
            <Image source={require('../assets/seb.jpeg')} style={{ height: 380, flex: 1 }} />
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                <Image source={require('../assets/flag-french.png')} style={{ height: 10, width: 10, flex: 1 }} />
          Pilote 1</Text>
              <Text></Text>
              <Text >
                <Image source={require('../assets/flag-french.png')} style={{ height: 10, width: 10, flex: 1 }} />
          Pilote 2</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ullamcorper lectus turpis, et lacinia arisi, in congue metus tincidunt vel. Fusce ullamcorper ligula mi. Praesent placerat, nibh non posuere eleifende maximus nunc at interdt sodales purus.</Text>
          </CardItem>
          <CardItem>
            <Left>
              <Icon name='heart' size='25x' />
            </Left>

            <Right><Text>Gélocolaliser
      <Icon name='map-marker' size='25x' /></Text>
            </Right>
          </CardItem>
        </Card>


      </Content>
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

