import React, { useState, useEffect } from 'react';
import { Header, Content, Button, Card, CardItem, Right, Left, Body, Container, Footer, FooterTab, Thumbnail, Text, } from 'native-base';
import { View, Image, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Importer la librairie de composants
import { RallyeH1, RallyeH3, greyDarkTa, whiteTa, icoWhite, redTa } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.14:3000';

export default function NewsScreen(props) {

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


  return (
    <Container>

      <Header style={{ backgroundColor: greyDarkTa }}>
        <Left>
          <Icon name='bars' size='25x' style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
        </Left>

        <Body>
          <Text style={{ color: whiteTa }}>HOME</Text>
        </Body>

        <Right>
          <Icon name='user-circle' size='25x' style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
        </Right>
      </Header>

      <Content>
        {newsList.map((news, i) => (
          // if(i<50){
          //   news[i].substr(1, 50)
          // }
          <Card>
            <CardItem cardBody>
              <Left>
                <Body>
                  <Text>
                    <RallyeH1 text={news.title} />
                  </Text>
                  <Image
                    source={news.image}
                    style={{ height: 200, width: null, flex: 1 }}
                  />
                  <Text note>{news.description}</Text>
                  <Text note style={{ color: redTa }} a href="#">Lire la suite <Ionicons style={{ color: redTa }} name='ios-arrow-dropright-circle' /></Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        ))}

        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left>
              <Thumbnail square large source={{ uri: 'https://res.cloudinary.com/dibl3ihpy/image/upload/v1607604492/260_ezshu6.jpg' }} />
              <Body>
                <Text><RallyeH3 text="Titre de la news" /></Text>
                <Text note>NativeBase Toast can be used to display quick warning or error messages... <Text note style={{ color: redTa }} a href="#">Lire la suite </Text><Ionicons style={{ color: redTa }} name='ios-arrow-dropright-circle' /></Text>
              </Body>
            </Left>
          </CardItem>
        </Card>

      </Content>

      <Footer>
        <FooterTab style={{ backgroundColor: greyDarkTa }}>
          <Button onPress={() => props.navigation.navigate('Home')}>
            <Ionicons name='ios-home' size={25} color='white' />
            <Text style={{ color: whiteTa, fontSize: 10 }}>Home</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Teams')}>
            <Ionicons name='ios-car' size={25} color='white' />
            <Text style={{ color: whiteTa, fontSize: 10 }}>Teams</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Classement')}>
            <Ionicons name='ios-trophy' size={25} color='white' />
            <Text style={{ color: whiteTa, fontSize: 10 }}>Classement</Text>
          </Button >
          <Button onPress={() => props.navigation.navigate('Map')}>
            <Ionicons name='ios-map' size={25} color='white' />
            <Text style={{ color: whiteTa, fontSize: 10 }}>Map</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Medias')}>
            <Ionicons name='ios-images' size={25} color='white' />
            <Text style={{ color: whiteTa, fontSize: 10 }}>Medias</Text>
          </Button>
        </FooterTab>
      </Footer>

    </Container>
  )

}