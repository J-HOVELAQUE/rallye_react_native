import React, { useEffect, useState } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Accordion, Left, Title, Body, Right } from 'native-base';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { RallyeH1, RallyeH2, RallyeH3 } from '../components/rallye-lib';



// const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
const serverUrl = 'http://192.168.1.26:3000';



function HebergementScreen(props) {



  const [dataArray, setDataArray] = useState([]);

  // { title: "Hebergement", content: "Lorem ipsum dolor sit amet" },
  // { title: "Restauration", content: "Lorem ipsum dolor sit amet" },
  // { title: "Navette", content: "Lorem ipsum dolor sit amet" }

  useEffect(() => {
    const getData = async () => {

      //// Getting the token from redux ////
      console.log('Connected', props.userConnected);

      //// Getting data of accomodation and catering ////


      const rawAnswer = await fetch(`${serverUrl}/user/get-info?token=${props.userConnected.token}`, {
        method: 'GET'
      })
      const answer = await rawAnswer.json();

      const formatedAccomodation = <View>
        <RallyeH3 text={answer.accomodation[0].name} />

        <Text>{answer.accomodation[0].adress}</Text>

      </View>

      setDataArray([...dataArray, {
        title: "Hebergement",
        content: formatedAccomodation
      }])
      console.log("ACCOMODATON", answer.accomodation);

    }
    getData()
  }
    , [])

  return (
    <Container >
      <Header style={{ backgroundColor: '#313131' }}>
        <Left>
          <Button transparent>
            <Icon name='ios-people' />
          </Button>
        </Left>
        <Body>
          <Title>Hebergement</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => props.navigation.openDrawer()}>
            <Icon name='menu' />
          </Button>
        </Right>
      </Header>

      <Content>
        <Accordion
          dataArray={dataArray}
          icon="add"
          expandedIcon="remove"
          iconStyle={{ color: "black" }}
          expandedIconStyle={{ color: "red" }}
        />
      </Content>

      <Footer>
        <FooterTab style={{ backgroundColor: '#313131', }}>
          <Button onPress={() => props.navigation.navigate('Home')}>
            <Ionicons name='ios-home' size={25} color='white' />
            <Text style={{ color: 'white', fontSize: 10 }}>Home</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Teams')}>
            <Ionicons name='ios-car' size={25} color='white' />
            <Text style={{ color: 'white', fontSize: 10 }}>Teams</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Classement')}>
            <Ionicons name='ios-trophy' size={25} color='white' />
            <Text style={{ color: 'white', fontSize: 10 }}>Classement</Text>
          </Button >
          <Button onPress={() => props.navigation.navigate('Map')}>
            <Ionicons name='ios-map' size={25} color='white' />
            <Text style={{ color: 'white', fontSize: 10 }}>Map</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Medias')}>
            <Ionicons name='ios-images' size={25} color='white' />
            <Text style={{ color: 'white', fontSize: 10 }}>Medias</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    userConnected: state.userConnected,
  }
}

export default connect(
  mapStateToProps,
  null
)(HebergementScreen);