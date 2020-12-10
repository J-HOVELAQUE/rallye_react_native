import React from 'react';
import { Header, Content, Button, Icon, Card, CardItem, Right, Left, Body, Container, Footer, FooterTab, Thumbnail, Text,  } from 'native-base';
import { View, Image,  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NewsScreen(props) {

  return (
    

    <Container>

<Header style={{ backgroundColor: '#313131' }}>
    <Button style={{ backgroundColor: '#313131' }} onPress={() => props.navigation.openDrawer()}>
      <Icon name='menu' style={{ color: 'white' }} />
    </Button>
  </Header>

        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: '../assets/seb.jpeg'}} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'Image URL'}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      {/* </Container>

    <Container style={{ backgroundColor: 'black' }}> */}
     



      <Content >

        <Card style={{ width: '100%', flex: 1 }}>
          <CardItem >
            <Text>Date du jour</Text>
          </CardItem>
          <CardItem>
            <Image 
            source={require('../assets/seb.jpeg')} 
            style={{ width: '100%', height: 380, flex: 1 }} 

          />

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
              <Icon name="heart" />
            </Left>

            <Right>
              <Icon name="locate" />
            </Right>
          </CardItem>
        </Card>
      </Content>

      <Footer>
        <FooterTab style={{ backgroundColor: '#313131', }}>
          <Button onPress={() => props.navigation.navigate('Home')}>
            <Ionicons name='ios-home' size={25} color='white' />
            <Text style={{ color: 'white', fontSize: 10 }}>Home</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Teams')}>
            <Ionicons name='ios-car' size={25} color='white' />
            <Text style={{ color: 'white', fontSize: 10 }}>Teams</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Classement')}>
            <Ionicons name='ios-trophy' size={25} color='white' />
            <Text style={{ color: 'white', fontSize: 10 }}>Classement</Text>
          </Button >
          <Button onPress={() => props.navigation.navigate('Map')}>
            <Ionicons name='ios-map' size={25} color='white' />
            <Text style={{ color: 'white', fontSize: 10 }}>Map</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Medias')}>
            <Ionicons name='ios-images' size={25} color='white' />
            <Text style={{ color: 'white', fontSize: 10 }}>Medias</Text>
          </Button>
        </FooterTab>
      </Footer>
      
    </Container>
  );
}