import React from 'react';

import { View, Text, StyleSheet, ImageBackground , Image} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Card,CardItem,Content } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";

export default function MediaScreen(props) {
  return (
    
    <Container>
        <Header style={{ backgroundColor: '#313131'}}>
          <Left>
            <Button transparent>
              <Icon name='ios-people' />
            </Button>
          </Left>
          <Body>
            <Title>Media</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        <ImageBackground source={require('../assets/fondCarbon.jpg')} style={styles.container}>
        <Content>
          <View style={{ flex: 1, flexDirection: 'row',justifyContent: 'space-between',margin:5}}>
            <Image source={require('../assets/206.jpg')} style={{height: 90, width: 110}}/>
            <Image source={require('../assets/206.jpg')} style={{height: 90, width: 110}}/>
            <Image source={require('../assets/206.jpg')} style={{height: 90, width: 110}}/>
          </View>
          <View style={{ flex: 1, flexDirection: 'row',justifyContent: 'space-between',margin:5}}>
            <Image source={require('../assets/206.jpg')} style={{height: 90, width: 110}}/>
            <Image source={require('../assets/206.jpg')} style={{height: 90, width: 110}}/>
            <Image source={require('../assets/206.jpg')} style={{height: 90, width: 110}}/>
          </View>
          <View style={{ flex: 1, flexDirection: 'row',justifyContent: 'space-between',margin:5}}>
            <Image source={require('../assets/206.jpg')} style={{height: 90, width: 110}}/>
            <Image source={require('../assets/206.jpg')} style={{height: 90, width: 110}}/>
            <Image source={require('../assets/206.jpg')} style={{height: 90, width: 110}}/>
          </View>
          <View style={{ flex: 1, flexDirection: 'row',justifyContent: 'space-between',margin:5}}>
            <Image source={require('../assets/206.jpg')} style={{height: 90, width: 110}}/>
            <Image source={require('../assets/206.jpg')} style={{height: 90, width: 110}}/>
            <Image source={require('../assets/206.jpg')} style={{height: 90, width: 110}}/>
          </View>
          <View style={{ flex: 1, flexDirection: 'row',justifyContent: 'space-between',margin:5}}>
            <Image source={require('../assets/206.jpg')} style={{height: 90, width: 110}}/>
            <Image source={require('../assets/206.jpg')} style={{height: 90, width: 110}}/>
            <Image source={require('../assets/206.jpg')} style={{height: 90, width: 110}}/>
          </View>
          <View style={{ flex: 1, flexDirection: 'row',justifyContent: 'space-between',margin:5}}>
            <Image source={require('../assets/206.jpg')} style={{height: 90, width: 110}}/>
            <Image source={require('../assets/206.jpg')} style={{height: 90, width: 110}}/>
            <Image source={require('../assets/206.jpg')} style={{height: 90, width: 110}}/>
          </View>
          


        </Content>
        </ImageBackground>
      </Container>
      
  )}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
  })