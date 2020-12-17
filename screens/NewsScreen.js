import React, { useState, useEffect } from 'react';
import { Content, Card, CardItem, Left, Body, Container, Thumbnail, Text, } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { RallyeH3, redTa } from '../components/rallye-lib';
import HeaderRally from '../components/HeaderRally';
import FooterRally from '../components/FooterRally';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';

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

  return (
    <Container>
      <HeaderRally openBurgerMenu={props.navigation.openDrawer}
        nav={props.navigation.navigate}
        titleHeader="NEWS" />

      <Content>
        {newsList.map((news, i) => (
          <Card style={{ padding: 10 }} key={news._id}>
            <CardItem cardBody>
              <Left>
                <Thumbnail square large source={{ uri: news.image }} />
                <Body>
                  <Text><RallyeH3 text={news.title} /></Text>
                  <Text note>{news.description.slice(0, 100)} ...</Text>
                  <Text onPress={() => {
                    props.navigation.navigate('Detail');
                    props.recordClickedNews({
                      title: news.title,
                      description: news.description,
                      image: news.image
                    })
                  }}>
                    <Text note style={{ color: redTa }} a href="#">Lire la suite </Text>
                    <Ionicons style={{ color: redTa }} name='ios-arrow-dropright-circle' />
                  </Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        ))}

      </Content>

      <FooterRally nav={props.navigation.navigate} />

    </Container>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    recordClickedNews: function (news) {
      dispatch({
        type: 'record-news',
        news: news
      })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NewsScreen);