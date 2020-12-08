import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Accordion } from 'native-base';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

export default function MediaScreen(props) {

  return (
    <ImageBackground source={require('../assets/fondCarbon.jpg')} style={styles.container}>
      <Header>
        <Button onPress={() => props.navigation.openDrawer()}>
          <Icon name='menu' style={{ color: 'white' }} />

        </Button>
      </Header>

      <Content >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: "white" }}>Page Media</Text>
        </View>

      </Content>


    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})
