import React from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon ,Left,Body,Title,Right, Image  } from 'native-base';
import { View, Text ,ImageBackground,StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { RedButtonLogin, RedButton, RallyeH1, RallyeH2, RallyeH3, greyDarkTa, whiteTa, icoWhite, blackTa, ProfilAvatar, greyLightTa } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function ProgrammeScreen(props) {

  return (
    <Container >
      
      <Header style={{ backgroundColor: greyDarkTa }}>
        <Left>
          <Icon name='bars' size={25} style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
        </Left>

        <Body>
          <Text style={{ color: whiteTa }}>TEST</Text>
        </Body>

        <Right>
          <Icon name='user-circle' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
        </Right>
      </Header>

      <Content>
      
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: "red" }}>Page Programme</Text>
        </View>
      </Content>
      
      <Footer>
        <FooterTab style={{ backgroundColor: greyDarkTa, }}>
          <Button onPress={() => props.navigation.navigate('Home')}>
            <Icon name='tachometer' size={20} style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Rallye</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Teams')} >
            <Icon name='car' size={20} style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Pilotes</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Classement')}>
            <Icon name='trophy' size={20} style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Résultats</Text>
          </Button >
          <Button onPress={() => props.navigation.navigate('Map')}>
            <Icon name='map' size={20} style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Map</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Medias')}>
            <Icon name='image' size={20} style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Medias</Text>
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
