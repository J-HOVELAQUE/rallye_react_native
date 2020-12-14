import React from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon ,Left,Body,Title,Right, Image  } from 'native-base';
import { View, Text ,ImageBackground,StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';


export default function ProgrammeScreen(props) {

  return (
    <Container >
      
      <Header style={{ backgroundColor: '#313131'}}>
        
          <Left>
            <Button transparent>
            <Icon name='arrow-back' style={{ color: 'white' }}  onPress={() => props.navigation.navigate('Media')}/>
            </Button>
          </Left>
          <Body>
            <Title>Video</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
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
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
