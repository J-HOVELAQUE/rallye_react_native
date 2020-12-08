import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Accordion } from 'native-base';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';



export default class test extends Component {
  render() {
    return (
      <Container>
        <Header>
        <Button onPress={() => this.props.navigation.openDrawer()}>
            <Icon name='menu' style={{color:'white'}}/>
            
            </Button>
        </Header>
        <Content>
          
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                <Text style={{color:"red"}}>Page Programme</Text>
            </View>

        </Content>
        <Footer>
          <FooterTab style={{backgroundColor: '#313131',}}>
            <Button onPress={() => this.props.navigation.navigate('Home')}>
            <Icon name='ios-home'style={{color:'white'}} />
              <Text style={{color:'white',fontSize:11}}>Home</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Team')}>
            <Icon name='ios-car' style={{color:'white'}}/>
              <Text style={{color:'white',fontSize:11}}>Team</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Classement')}>
            <Icon name='ios-trophy' style={{color:'white'}}/>
              <Text style={{color:'white',fontSize:11}}>Classement</Text>
            </Button >
            <Button onPress={() => this.props.navigation.navigate('Map')}>
            <Icon name='ios-map' style={{color:'white'}}/>
              <Text style={{color:'white',fontSize:11}}>Map</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Media')}>
            <Icon name='images' style={{color:'white'}}/>
            <Text style={{color:'white',fontSize:11}}>Media</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
function MenuScreen ({navigation}){}

