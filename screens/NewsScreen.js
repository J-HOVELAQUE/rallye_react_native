import React, { useState, useEffect } from 'react';
import { Header, Content, Button, Card, CardItem, Right, Left, Body, Container, Footer, FooterTab, Thumbnail, Text, } from 'native-base';
import { View, Image, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

// Importer la librairie de composants
import { RallyeH1, RallyeH3, greyDarkTa, whiteTa, icoWhite, redTa } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.14:3000';

function NewsScreen(props) {

  const [newsList, setNewsList] = useState([])

  useEffect(() => {

    async function getNews() {
      const rawAnswer = await fetch(`${serverUrl}/news/get-news`, {
        method: 'GET',
      });
      let allNews = await rawAnswer.json();
      setNewsList(allNews.news)
    }
    getNews()
  }, [])

  console.log('NEWS : ', newsList.length)

  console.log('NEWS >>>>>>>>>>>>>>>>>>>>>>>>>>>', newsList);


  return (
    <Container>

      <Header style={{ backgroundColor: greyDarkTa }}>
        <Left>
          <Icon name='bars' size={25} style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
        </Left>

        <Body>
          <Text style={{ color: whiteTa }}>NEWS</Text>
        </Body>

        <Right>
          {props.user.status === undefined ?
            <Icon name='user-circle' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
            :
            <Icon name='sign-out' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { AsyncStorage.clear(); props.resetUserConnected(); props.navigation.navigate('Home') }} />
          }
        </Right>
      </Header>

      <Content>
        {newsList.map((news, i) => (
          <Card style={{ padding: 10 }} key={news._id}>
            <CardItem cardBody>
              <Left>
                <Thumbnail square large source={{ uri: news.image }} />
                <Body>
                  <Text><RallyeH3 text={news.title} /></Text>
                  <Text note>{news.description.slice(0, 100)} ...</Text>
                  <Text><Text note style={{ color: redTa }} a href="#">Lire la suite </Text><Ionicons style={{ color: redTa }} name='ios-arrow-dropright-circle' /></Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        ))}

      </Content>

      <Footer>
        <FooterTab style={{ backgroundColor: greyDarkTa, }}>
          <Button onPress={() => props.navigation.navigate('Home')}>
            <Icon name='tachometer' size={20} style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Rallye</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Pilotes')} >
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
  )

}


function mapStateToProps(state) {
  return {
    userFavorites: state.userFavorites,
    user: state.userConnected
  }
}


function mapDispatchToProps(dispatch) {
  return {
    resetUserConnected: function () {
      dispatch({
        type: 'reset'
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsScreen);