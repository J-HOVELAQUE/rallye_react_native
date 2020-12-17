import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Container, Content, Accordion } from 'native-base';
import { connect } from 'react-redux';

import { RallyeH1, RallyeH2, RallyeH3, redTa } from '../components/rallye-lib';
import HeaderRally from '../components/HeaderRally';
import FooterRally from '../components/FooterRally';


const serverUrl = 'https://powerful-earth-91256.herokuapp.com';

function HebergementScreen(props) {

  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const getData = async () => {

      //// Getting data of accomodation and catering ////
      const rawAnswer = await fetch(`${serverUrl}/user/get-info?token=${props.userConnected.token}`, {
        method: 'GET'
      })
      const answer = await rawAnswer.json();

      console.log('herbergement //////// : ', answer.catering[0])

      //// Format all content field of accordion menu ////
      const formatedAccomodation =
        <View style={{marginTop: 10, fontFamily: "Roboto_400Regular", paddingHorizontal: 20, paddingVertical: 10}}>
          <RallyeH3 text="Adresse de votre hôtel" />
          <Text></Text>
          <RallyeH3 text={answer.accomodation[0].name}/>
          <Text>{answer.accomodation[0].adress}</Text>
        </View>

      const formatedCatering =
        <View style={{marginTop: 10, fontFamily: "Roboto_400Regular", paddingHorizontal: 20, paddingVertical: 10}}>
          <RallyeH3 text="Adresse du lieu de déjeuner" />
          <Text style={{marginTop: 10}}>{answer.catering[0].adress}</Text>
        </View>

      const formatedShuttle =
        <View style={{marginTop: 10, fontFamily: "Roboto_400Regular", paddingHorizontal: 20, paddingVertical: 10}}>
          <Text >Les navettes que nous vous proposons vous déposent à vos hôtels et aux Parcs Fermés. Les horaires affichés sont à titre indicatifs. Les rotations des navettes sont prévues toutes les 30 minutes jusqu'à 9h. Vous trouverez également à côté des points de navettes des Parcs fermés le camion à bagages.</Text>
          <Text></Text>
          <RallyeH3 text="Adresse du Parc Fermé" />
          <Text>{answer.accomodation[0].shuttle_point}</Text>
          <Text></Text>
          <RallyeH3 text="Horaires des navettes" />
          <View>
            {answer.accomodation[0].shuttle_hours.map(shuttle => { return <Text key={shuttle}>{shuttle}</Text> })}

          </View>
        </View >

      //// Building the accordion menu ////
      setDataArray([...dataArray, {
        title: "Hébergement",
        content: formatedAccomodation
      },
      {
        title: "Restauration",
        content: formatedCatering
      },
      {
        title: "Navette",
        content: formatedShuttle
      }])
      console.log("ACCOMODATON", answer.accomodation);

    }
    getData()
  }, [])

  return (
    <Container>

      <HeaderRally openBurgerMenu={props.navigation.openDrawer}
        nav={props.navigation.navigate}
        titleHeader="INFOS PRATIQUES" />

        <View style={{paddingHorizontal: 20, paddingVertical: 20}}>

      <RallyeH1 text="Informations pratiques" />
      <Text style={{paddingTop: 20}}>{props.userConnected.firstName}, </Text>
      <Text style={{paddingTop: 10}}>Vous trouverez ici, toutes les informations utiles pour votre hébergement, les points de restaurations ainsi que les horaires des navettes allant du Parc Fermé à votre hôtel. </Text>
      <Text style={{paddingTop: 10}}>Si vous utilisez nos services de bagageries, n'oubliez pas de récupérer vos baggages avant de prendre la navette qui vous déposera à votre hôtel. </Text>
      <Text style={{paddingTop: 10}}>Pour rappel, le camion bagages, se trouve à proximité du point de navettes du Parc Fermé.</Text>
      </View>
      <Content>
        <Accordion
          dataArray={dataArray}
          icon="add"
          expandedIcon="remove"
          iconStyle={{ color: "black" }}
          expandedIconStyle={{ color: "red" }}
        />
      </Content>
      
      <FooterRally nav={props.navigation.navigate} />

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