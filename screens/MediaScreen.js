import React from 'react';

import { View, Text, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Card, CardItem, Content } from 'native-base';

import Lightbox from 'react-native-lightbox';

import { RedButtonLogin, RedButton, RallyeH1, RallyeH2, RallyeH3, greyDarkTa, whiteTa, icoWhite, blackTa, ProfilAvatar, greyLightTa } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function MediaScreen(props) {
  return (

    <Container>
      <Header style={{ backgroundColor: greyDarkTa }}>
        <Left>
          <Icon name='bars' size={25} style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
        </Left>

        <Body>
          <Text style={{ color: whiteTa }}>PHOTOS &amp; VIDEOS</Text>
        </Body>

        <Right>
          <Icon name='user-circle' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
        </Right>
      </Header>

      <Content>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
          <ScrollView style={styles.container}>
            <Lightbox underlayColor="white">
              <Image
                style={styles.contain}
                resizeMode="contain"
                source={{ uri: 'https://www.yayomg.com/wp-content/uploads/2014/04/yayomg-pig-wearing-party-hat.jpg' }} />
            </Lightbox>
          </ScrollView>
          <ScrollView style={styles.container}>
            <Lightbox underlayColor="white">
              <Image
                style={styles.contain}
                resizeMode="contain"
                source={{ uri: 'https://www.yayomg.com/wp-content/uploads/2014/04/yayomg-pig-wearing-party-hat.jpg' }} />
            </Lightbox>
          </ScrollView>
          <ScrollView style={styles.container}>
            <Lightbox underlayColor="white">
              <Image
                style={styles.contain}
                resizeMode="contain"
                source={{ uri: 'https://www.yayomg.com/wp-content/uploads/2014/04/yayomg-pig-wearing-party-hat.jpg' }} />
            </Lightbox>
          </ScrollView>

        </View>


      </Content>
    </Container>

  )
}
const styles = StyleSheet.create({ contain: { flex: 1, height: 150, }, container: { flex: 1, } });
