import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Container, Header, Content, Footer, FooterTab, Button, Accordion, Left, Title, Body, Right } from 'native-base';
// import { Ionicons } from '@expo/vector-icons';
import { greyDarkTa, whiteTa, icoWhite, RallyeH2 } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';


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

      const formatedAccomodation = <Text>{answer.accomodation[0].adress}</Text>

      setDataArray([...dataArray, {
        title: "Hebergement",
        content: formatedAccomodation
      }])
      console.log(answer.accomodation);

    }
    getData()
  }
    , [])


  return (

    <Container >
      <Header style={{ backgroundColor: greyDarkTa }}>
        <Left>
          <Icon name='bars' size={25} style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
        </Left>

        <Body>
          <Text style={{ color: whiteTa }}>INFOS PRATIQUES</Text>
        </Body>

        <Right>
          <Icon name='user-circle' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
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
        <FooterTab style={{ backgroundColor: greyDarkTa, }}>
          <Button onPress={() => props.navigation.navigate('Home')}>
            <Icon name='tachometer' size={20} style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Rallye</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Teams')} >
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