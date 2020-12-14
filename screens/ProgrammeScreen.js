import React from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon ,Left,Body,Title,Right, Image  } from 'native-base';
import { View, Text ,ImageBackground,StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function ProgrammeScreen(props) {

  return (
    <Container >
      
      <Header style={{ backgroundColor: '#313131'}}>
        
          <Left>
            <Button transparent>
            <Icon name='ios-people' />
            </Button>
          </Left>
          <Body>
            <Title>Programme</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
<ImageBackground source={require('../assets/fondCarbon.jpg')} style={styles.container}>
      <Content>
      
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: "red" }}>Page Programme</Text>
        </View>
      </Content>
      </ImageBackground>
      
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})
