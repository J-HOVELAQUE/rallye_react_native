import React, { useState, useEffect } from 'react';
import { Header, Content, Button, Icon, Card, CardItem, Right, Left, Body, Container, Footer, FooterTab, Thumbnail, Text, } from 'native-base';
import { View, Image, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Importer la librairie de composants
import { redTa, whiteTa, blackTa, greyDarkTa, greyLightTa, RallyeH1, RallyeH2, RallyeH3 } from '../components/rallye-lib';

const serverUrl = 'http://192.168.1.14:3000';

export default function NewsScreen(props) {

  const [newsList, setNewsList] = useState([])

  // useEffect(() => {
  //   const rawAnswer = async fetch () => {
  //     const data = await fetch('/get-news')
  //     const body = await data.json()
  //     console.log(body)
  //     setNewsList(body.title)
  //   }

  //   findNews()
  // }, [])

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
        <Button style={{ backgroundColor: greyDarkTa }} onPress={() => props.navigation.openDrawer()}>
          <Icon name='menu' style={{ color: whiteTa }} />
        </Button>
      </Header>

      <Content>
        {newsList.map((news, i) => (
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

//   return (

//     <Container>

//       <Header style={{ backgroundColor: greyDarkTa }}>
//         <Button style={{ backgroundColor: greyDarkTa }} onPress={() => props.navigation.openDrawer()}>
//           <Icon name='menu' style={{ color: whiteTa }} />
//         </Button>
//       </Header>



//       <Content>
//         <Card>
//           <CardItem cardBody>
//             <Left>
//               <Body>
//                 <Text><RallyeH1 text="Titre de la news" /></Text>
//                 <Image source={{ uri: 'https://res.cloudinary.com/dibl3ihpy/image/upload/v1607604492/260_ezshu6.jpg' }} style={{ height: 200, width: null, flex: 1 }}  />
//                 <Text note>NativeBase Toast can be used to display quick warning or error messages Toast can be used to display quick warning or error messages... </Text>
//                 <Text note style={{color: redTa}} a href="#">Lire la suite <Ionicons style={{color: redTa}} name='ios-arrow-dropright-circle'/></Text>
//               </Body>
//             </Left>
//           </CardItem>
//         </Card>

//         <Card style={{flex: 0}}>
//             <CardItem>
//               <Left>
//                 <Thumbnail square large source={{uri: 'https://res.cloudinary.com/dibl3ihpy/image/upload/v1607604492/260_ezshu6.jpg'}} />
//                 <Body>
//                   <Text><RallyeH3 text="Titre de la news" /></Text>
//                   <Text note>NativeBase Toast can be used to display quick warning or error messages... <Text note style={{color: redTa}} a href="#">Lire la suite </Text><Ionicons style={{color: redTa}} name='ios-arrow-dropright-circle'/></Text>
//                 </Body>
//               </Left>
//             </CardItem>
//           </Card>
//       </Content>

//       <Footer>
//         <FooterTab style={{ backgroundColor: greyDarkTa }}>
//           <Button onPress={() => props.navigation.navigate('Home')}>
//             <Ionicons name='ios-home' size={25} color= 'white' />
//             <Text style={{ color: whiteTa, fontSize: 10 }}>Home</Text>
//           </Button>
//           <Button onPress={() => props.navigation.navigate('Teams')}>
//             <Ionicons name='ios-car' size={25} color='white' />
//             <Text style={{ color: whiteTa, fontSize: 10 }}>Teams</Text>
//           </Button>
//           <Button onPress={() => props.navigation.navigate('Classement')}>
//             <Ionicons name='ios-trophy' size={25} color='white' />
//             <Text style={{ color: whiteTa, fontSize: 10 }}>Classement</Text>
//           </Button >
//           <Button onPress={() => props.navigation.navigate('Map')}>
//             <Ionicons name='ios-map' size={25} color='white' />
//             <Text style={{ color: whiteTa, fontSize: 10 }}>Map</Text>
//           </Button>
//           <Button onPress={() => props.navigation.navigate('Medias')}>
//             <Ionicons name='ios-images' size={25} color='white' />
//             <Text style={{ color: whiteTa, fontSize: 10 }}>Medias</Text>
//           </Button>
//         </FooterTab>
//       </Footer>

//     </Container>
//   );
// }