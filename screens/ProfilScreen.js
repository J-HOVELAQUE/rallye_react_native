import React from 'react';
import { Header, Content, Button, Icon, Card, CardItem, Right,Left,Body,Container,Footer,FooterTab } from 'native-base';
import { View,Image,Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function ProfilScreen(props) {

  return (
    <Container style={{ backgroundColor: 'black' }}>
      <Header style={{ backgroundColor: '#313131' }}>
        <Button style={{ backgroundColor: '#313131' }} onPress={() => props.navigation.openDrawer()}>
          <Icon name='menu' style={{ color: 'white' }} />
        </Button>
      </Header>

      

      <Content >

<Card style={{width:350,flex:1}}>
<CardItem > 
    
      <Text>Numéro équipe #001</Text>
     
    </CardItem>
    <CardItem>
        <Image source={require('../assets/seb.jpeg')} style={{height: 380,  flex: 1}}/>
    </CardItem> 
    <CardItem>
    <Body>
      <Text>
        <Image source={require('../assets/flag-french.png')} style={{height: 10, width: 10, flex: 1}}/>
          Pilote 1</Text>
      <Text></Text>
      <Text >
        <Image source={require('../assets/flag-french.png')} style={{height: 10, width: 10, flex: 1}}/>
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
            <Text style={{ color: 'white', fontSize:10}}>Home</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Teams')}>
            <Ionicons name='ios-car' size={25} color='white' />
            <Text style={{ color: 'white', fontSize:10 }}>Teams</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Classement')}>
            <Ionicons name='ios-trophy' size={25} color='white' />
            <Text style={{ color: 'white', fontSize:10 }}>Classement</Text>
          </Button >
          <Button onPress={() => props.navigation.navigate('Map')}>
            <Ionicons name='ios-map' size={25} color='white' />
            <Text style={{ color: 'white', fontSize:10 }}>Map</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Medias')}>
            <Ionicons name='ios-images' size={25} color='white' />
            <Text style={{ color: 'white', fontSize:10 }}>Medias</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

