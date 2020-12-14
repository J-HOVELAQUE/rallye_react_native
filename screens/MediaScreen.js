import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Card, CardItem, Content } from 'native-base';
import Lightbox from 'react-native-lightbox';
import { RedButtonLogin, RedButton, RallyeH1, RallyeH2, RallyeH3, greyDarkTa, whiteTa, icoWhite, blackTa, ProfilAvatar, greyLightTa } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function MediaScreen(props) {
  return (
    <View>
      <Header style={{ backgroundColor: greyDarkTa }}>
        <Left>
          <Icon name='bars' size={25} style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
        </Left>

        <Body>
          <Text style={{ color: whiteTa }}>HOME</Text>
        </Body>

        <Right>
          <Icon name='user-circle' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
        </Right>
      </Header>

      <Content>


        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Button style={{ flex: 1, justifyContent: "center", backgroundColor: "red", width: "40%" }} onPress={() => props.navigation.navigate('Photos')}>
            <Icon name='ios-images' />
            <Text >Photos</Text>
          </Button>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
            <ScrollView style={styles.container}>

              <Lightbox underlayColor="white" >
                <Image
                  style={styles.contain}
                  resizeMode="contain"
                  source={{ uri: 'https://www.rallye-sport.fr/wp-content/uploads/2017/12/Calendrier-Epreuves-Historiques-2018.jpg' }} />
              </Lightbox>
            </ScrollView>
          </View>
          <Button style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "red", width: "40%" }} onPress={() => props.navigation.navigate('Video')}>
            <Icon name='video' />
            <Text >Vidéo</Text>
          </Button>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
            <ScrollView style={styles.container}>
              <Lightbox underlayColor="white">
                <Image
                  style={styles.contain}
                  resizeMode="contain"
                  source={{ uri: 'https://www.rallye-sport.fr/wp-content/uploads/2017/12/Calendrier-Epreuves-Historiques-2018.jpg' }} />
              </Lightbox>
            </ScrollView>
          </View>

        </View>
      </Content>

    </View>

  )
}
const styles = StyleSheet.create({ contain: { flex: 1, height: 150, }, container: { flex: 1, } });