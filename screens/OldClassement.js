import React, { useState, useEffect } from "react";
import { Header, Content, Container, Button, Card, CardItem, Text, Right, Left, Body, Title } from 'native-base';
import { View, StyleSheet, ImageBackground, Image, Picker } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Input, Overlay } from 'react-native-elements'
import { RedButton, greyDarkTa, whiteTa, icoWhite, blackTa, SearchInput, displayButton, RedButtonOutline } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';

const serverUrl = 'http://localhost:3000';

const HeadTable = ['N°', 'Voiture', 'Nat1', 'Pilote 1', 'Temps'];
const DataTable = [
  ['1', '2', '3', '4', '5'],
  ['a', 'b', 'c', 'd', 'e'],
  ['1', '2', '3', '4', '5'],
  ['a', 'b', 'c', 'd', 'e'],
  ['1', '2', '3', '4', '5'],
  ['1', '2', '3', '4', '5'],
  ['a', 'b', 'c', 'd', 'e'],
  ['1', '2', '3', '4', '5'],
  ['a', 'b', 'c', 'd', 'e'],
];

function Classement(props) {
  const [selectedValue, setSelectedValue] = useState("General");
  // const [dataArray, setDataArray] = useState([]);

  // Drapeaux Nationalités
  const urlFlagFRA = 'https://res.cloudinary.com/dibl3ihpy/image/upload/v1607678236/France_m9qlcw.png'
  const urlFlagCHE = 'https://res.cloudinary.com/dibl3ihpy/image/upload/v1607678236/Suisse_njyljk.png'
  const urlFlagWorld = 'https://res.cloudinary.com/dibl3ihpy/image/upload/v1608020160/world_pxx0mb.png'
  const team = props.infoTeam

  console.log(team);

  // Pour l'affichage des résultats via les btns Régularité et Compétition
  const [allResults, setAllResults] = useState([]);
  const [resultsToDisplay, setResultsToDisplay] = useState([]);
  const [displayButton, setDisplayButton] = useState('');

  useEffect(() => {
    async function getResults() {
      const rawAnswer = await fetch(`${serverUrl}/results/results`, {
        method: 'GET',
      });
      let allResults = await rawAnswer.json();
      setAllResults(allResults.timings);
    }
    getResults()

  }, []);

  // Pas besoin d'ajouter les classes de la compétition 
  const categoryRegularity = ['Basse', 'Intermédiaire', 'Haute'];

  // Filtre Régularité
  const filterRegularity = () => {
    const filteredTeams = allResults.filter(team => categoryRegularity.includes(team.category));
    // console.log("REGULARITY", filteredTeams);
    setResultsToDisplay(filteredTeams);
    setDisplayButton('Reg');
  }

  // Filtre Compétition : Si différent de la Régularité Alors = Compétition
  const filterCompetition = () => {
    const filteredTeams = allResults.filter(team => !categoryRegularity.includes(team.category));
    // console.log("COMPETITION", filteredTeams);
    setResultsToDisplay(filteredTeams);
    setDisplayButton('Comp');
  }

  // Classement par épreuve 'ESx' + Général
  const stagesNumber = ['ES1', 'ES2', 'ES3', 'ES4', 'Général'];

  // Filtrage par numéro épreuve + Général 
  const filterStages = () => {
    const filteredTeams = allResults.filter(result => stagesNumber.includes(result.timings));
    console.log("RESULTATS PAR EPREUVE", filterStages);
    setResultsToDisplay(filteredTeams);
  }

  // Filtrage par sous catégorie ex : Moyenne Intermédiaire pour la Régularité ou VHC pour la Compétition
  const filterCategory = () => {
    const filteredTeams = allResults.filter(result => categoryNumber.includes(result.timings));
    console.log("RESULTATS PAR SOUS CATEGORIE", filterCategory);
    setResultsToDisplay(filteredTeams);
  }

  // Prénom pilote
  function namePilot(firstName, lastName) {
    return (firstName.substr(0, 1).toUpperCase() + '. ' + lastName.toUpperCase())
  }

  // Nom pilote
  function fullNamePilot(firstName, lastName) {
    return (firstName.substr(0, 1).toUpperCase() + firstName.substr(1) + ' ' + lastName.toUpperCase())
  }

  // Nationalité pilote
  function flagNationality(nationality) {
    if (nationality === 'fra') {
      return urlFlagFRA
    } else if (nationality === 'che') {
      return urlFlagCHE
    } else {
      return urlFlagWorld
    }
  }

  let results = resultsToDisplay.map((result, i) => {
    return <View>
      <Table resultCars={result} navigation={props.navigation} />
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 1, borderColor: 'grey' }}>

          <Row data={HeadTable} style={styles.HeadStyle} textStyle={styles.TableText} />
          <Rows style={{ fontSize: 10 }}>
            <Image source={{ uri: flagNationality(team.pilot_1.nationality) }} style={{ height: 10, width: 15 }} />
            {namePilot(team.pilot_1.firstname, team.pilot_1.name)}
          </Rows>
          <Text style={{ fontSize: 10 }}>
                        <Image source={{ uri: flagNationality(team.pilot_2.nationality) }} style={{ height: 10, width: 15 }} />
                        {namePilot(team.pilot_2.firstname, team.pilot_2.name)}</Text>
        </Table>
      </View>
    </View>

    // return <View>
    // <Table resultCars={result} navigation={props.navigation} />
    // <View style={styles.container}>
    //   <Table borderStyle={{ borderWidth: 1, borderColor: 'grey' }}>

    //     <Row data={HeadTable} style={styles.HeadStyle} textStyle={styles.TableText} />
    //     <Rows key={team._id} textStyle={styles.TableText} />
    //   </Table>
    // </View>
    // </View>

  })

  return (
    <Container>

      <Header style={{ backgroundColor: greyDarkTa }}>
        <Left>
          <Icon name='bars' size={25} style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
        </Left>

        <Body>
          <Text style={{ color: whiteTa }}>CLASSEMENT</Text>
        </Body>

        <Right>
          {props.user.status === undefined ?
            <Icon name='user-circle' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
            :
            <Icon name='sign-out' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { AsyncStorage.clear(); props.resetUserConnected(); props.navigation.navigate('Home') }} />
          }
        </Right>
      </Header>


      {/* <Content >
        <View style={{ width: "100%", backgroundColor: "#E4E4E4" }}>

          <Picker
            mode="dropdown"

            selectedValue={selectedValue}
            style={{ height: 50, width: 150, backgroundColor: "#E4E4E4" }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="General" value="General" />
            <Picker.Item label="Moyenne Basse" value="Moyenne basse" />
            <Picker.Item label="Moyenne Intermédiaire" value="Moyenne Intermédiaire" />
            <Picker.Item label="Moyenne Haute" value="Moyenne Haute" />
          </Picker>
          <Input placeholder='Rechercher' style={{ backgroundColor: "#E4E4E4" }}></Input>
        </View>

        {results}

      </Content> */}

<Content>
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: blackTa, color: whiteTa }}>
          <SearchInput onChangeText={(val) => setSearchTeam(val)} placeholder='Rechercher...' />
        </View>
        <View style={{ marginHorizontal: 10, alignItems: 'center' }}>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            {
              displayButton == 'Reg' ?
                <RedButton onPress={() => filterRegularity()} title="Régularité" />
                :
                <RedButtonOutline onPress={() => filterRegularity()} title="Régularité" />
            }
            {
              displayButton == 'Comp' ?
                <RedButton onPress={() => filterCompetition()} title="Compétition" />
                :
                <RedButtonOutline onPress={() => filterCompetition()} title="Compétition" />
            }
          </View>

        </View>
        <View style={{ marginTop: 10, alignItems: "center" }}>

        <Picker
            mode="dropdown"

            selectedValue={selectedValue}
            style={{ height: 50, width: 150, backgroundColor: "#E4E4E4" }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="General" value="General" />
            <Picker.Item label="Moyenne Basse" value="Moyenne basse" />
            <Picker.Item label="Moyenne Intermédiaire" value="Moyenne Intermédiaire" />
            <Picker.Item label="Moyenne Haute" value="Moyenne Haute" />
          </Picker>

          {results}

        </View>
      </Content>

    </Container>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,


    backgroundColor: '#ffffff'
  },
  HeadStyle: {
    height: 50,
    alignContent: "center",
    backgroundColor: '#E4E4E4'
  },
  TableText: {
    margin: 10
  }
});


function mapDispatchToProps(dispatch) {
  return {
    onRecordUserConnected: function (user) {
      dispatch({
        type: 'record',
        user: user
      })
    },
    resetUserConnected: function () {
      dispatch({
        type: 'reset'
      })
    },
    retrieveFavoriteTeam: function (listFavorites) {
      dispatch({
        type: 'retrieveFavoriteTeam',
        listFavorites: listFavorites
      })
    }
  }
}

function mapStateToProps(state) {
  return {
    favorites: state.userFavorites,
    user: state.userConnected
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Classement);