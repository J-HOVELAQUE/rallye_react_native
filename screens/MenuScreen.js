import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Accordion } from 'native-base';
import { View, Text, StyleSheet,ImageBackground } from 'react-native';



export default class test extends Component {
  render() {
    return (
      <ImageBackground source={require('../assets/fondCarbon.jpg')} style={styles.container}>
      
        
        <Content >
            <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <Content>
            <Button onPress={() => this.props.navigation.navigate('Hebergement')}>
                <Icon style={{color:'white'}} name="home" />
                <Text style={{color:'white'}}>Hebergement</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Media')}>
              <Icon style={{color:'white'}} name="car" />
              <Text style={{color:'white'}}>Team</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Classement')}>
              <Icon style={{color:'white'}} name="add" />
              <Text style={{color:'white'}}>Podium</Text>
            </Button >
            <Button onPress={() => this.props.navigation.navigate('Map')}>
              <Icon style={{color:'white'}}name="map" />
              <Text style={{color:'white'}}>Map</Text>
            </Button>
            <Button onPress={() => this.props.navigation.openDrawer()}>
            <Icon style={{color:'white'}}name="menu"  />
            <Text style={{color:'white'}}>Menu</Text>
            </Button>

        </Content>
            </View>

        </Content>
       
      
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: "center",
    justifyContent: "center"
  }
})

function MenuScreen ({navigation}){}

