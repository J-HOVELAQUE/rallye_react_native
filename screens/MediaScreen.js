import React from 'react';

import { View, Text, StyleSheet, ImageBackground , Image,ScrollView} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Card,CardItem,Content } from 'native-base';

import Lightbox from 'react-native-lightbox';



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
            <ScrollView style={styles.container}>
     <Lightbox underlayColor="white">
      <Image
        style={styles.contain}
        resizeMode="contain"
        source={{ uri: 'https://www.yayomg.com/wp-content/uploads/2014/04/yayomg-pig-wearing-party-hat.jpg' }}/>
    </Lightbox>
    </ScrollView>
    <ScrollView style={styles.container}>
     <Lightbox underlayColor="white">
      <Image
        style={styles.contain}
        resizeMode="contain"
        source={{ uri: 'https://www.yayomg.com/wp-content/uploads/2014/04/yayomg-pig-wearing-party-hat.jpg' }}/>
    </Lightbox>
    </ScrollView>
    <ScrollView style={styles.container}>
     <Lightbox underlayColor="white">
      <Image
        style={styles.contain}
        resizeMode="contain"
        source={{ uri: 'https://www.yayomg.com/wp-content/uploads/2014/04/yayomg-pig-wearing-party-hat.jpg' }}/>
    </Lightbox>
    </ScrollView>
            
          </View>
          
          


        </Content>
        </ImageBackground>
      </Container>
      
  )}
  const styles = StyleSheet.create({contain: {flex: 1,height: 150,}, container: {flex: 1,}});
  