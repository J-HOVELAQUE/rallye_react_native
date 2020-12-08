import React from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Accordion } from 'native-base';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const dataArray = [
  { title: "Hebergement", content: "Lorem ipsum dolor sit amet" },
  { title: "Restauration", content: "Lorem ipsum dolor sit amet" },
  { title: "Navette", content: "Lorem ipsum dolor sit amet" }
];

export default function HebergementScreen(props) {


  return (
    <Container>

      <Header>
        <Button onPress={() => props.navigation.openDrawer()}>
          <Icon name='menu' style={{ color: 'white' }} />
        </Button>
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



