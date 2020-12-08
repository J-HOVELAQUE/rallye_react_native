import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Accordion } from 'native-base';
import { View, Text, StyleSheet,ImageBackground } from 'react-native';



export default class test extends Component {
  render() {
    return (
      <ImageBackground source={require('../assets/fondCarbon.jpg')} style={styles.container}>
      
        
        <Content >
            <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                <Text style={{color:"white"}}>Page TEAM</Text>
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

