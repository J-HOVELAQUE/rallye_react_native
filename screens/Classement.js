import React, { useState } from "react";
import { Header, Content, Container, Button, Card, CardItem, Text, Right, Left, Body, Title } from 'native-base';
import { View, StyleSheet, ImageBackground, Image, Picker } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Input, Overlay } from 'react-native-elements'
import { RedButtonLogin, RedButton, RallyeH1, RallyeH2, RallyeH3, greyDarkTa, whiteTa, icoWhite, blackTa, ProfilAvatar, greyLightTa } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';



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
            <Icon name='sign-out' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { AsyncStorage.clear(); props.resetUserConnected() ; props.navigation.navigate('Home') }} />
          }
        </Right>
      </Header>


      <Content >
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

        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 1, borderColor: 'grey' }}>
            <Row data={HeadTable} style={styles.HeadStyle} textStyle={styles.TableText} />
            <Rows data={DataTable} textStyle={styles.TableText} />
          </Table>
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