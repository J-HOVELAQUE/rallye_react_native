import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { Container, Header, Content, Footer, FooterTab, Button, Accordion, Left, Title, Body, Right } from 'native-base';
// import { Ionicons } from '@expo/vector-icons';
import { greyDarkTa, whiteTa, icoWhite, RallyeH2, RallyeH3 } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';

import HeaderRally from '../components/HeaderRally';




const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.26:3000';



function HebergementScreen(props) {



  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const getData = async () => {

      //// Getting the token from redux ////
      console.log('Connected', props.userConnected);

      //// Getting data of accomodation and catering ////
      const rawAnswer = await fetch(`${serverUrl}/user/get-info?token=${props.userConnected.token}`, {
        method: 'GET'
      })
      const answer = await rawAnswer.json();

      console.log('herbergement //////// : ', answer.catering[0])

      //// Format all content field of accordion menu ////
      const formatedAccomodation =
        <View>
          <RallyeH3 text={answer.accomodation[0].name} />
          <Text>{answer.accomodation[0].adress}</Text>
        </View>

      const formatedCatering =
        <View>
          <Text>{answer.catering[0].adress}</Text>
        </View>

      const formatedShuttle =
        <View>
          <RallyeH3 text={answer.accomodation[0].shuttle_point} />
          <View>
            {answer.accomodation[0].shuttle_hours.map(shuttle => { return <Text key={shuttle}>{shuttle}</Text> })}

          </View>
        </View >

      //// Building the accordion menu ////
      setDataArray([...dataArray, {
        title: "Hebergement",
        content: formatedAccomodation
      },
      {
        title: "Repas",
        content: formatedCatering
      },
      {
        title: "Navette",
        content: formatedShuttle
      }])
      console.log("ACCOMODATON", answer.accomodation);

    }
    getData()
  }
    , [])



  return (

    <Container >

      <HeaderRally openBurgerMenu={props.navigation.openDrawer}
        nav={props.navigation.navigate} />

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
          <Button onPress={() => props.navigation.navigate('Accueil')}>
            <Icon name='home' size={20} style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Accueil</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Pilotes')} >
            <Icon name='car' size={20} style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Pilotes</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Classement')}>
            <Icon name='trophy' size={20} style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Résultats</Text>
          </Button >
          <Button onPress={() => props.navigation.navigate('Live')}>
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


function mapDispatchToProps(dispatch) {
  return {
    resetUserConnected: function () {
      dispatch({
        type: 'reset'
      })
    }
  }
}

function mapStateToProps(state) {
  return {
    userConnected: state.userConnected,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HebergementScreen);
