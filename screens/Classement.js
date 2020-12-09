import React, { useState } from "react";
import { Header, Content, Button, Icon, Card, CardItem, Text, Right,Left,Body } from 'native-base';
import { View, StyleSheet, ImageBackground,Image,Picker } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Input, Overlay } from 'react-native-elements'

      const HeadTable = ['N°', 'Voiture', 'Nat1', 'Pilote 1', 'Temps'];
      const DataTable =  [
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

export default function Team(props) {
  const [selectedValue, setSelectedValue] = useState("General");
  return (
    <ImageBackground source={require('../assets/fondCarbon.jpg')} style={styles.container}>

<Header style={{ backgroundColor: '#313131'}}>
        <Button style={{ backgroundColor: '#313131'}}>
        <Icon name='menu' style={{ color: 'white' }}  onPress={() => props.navigation.openDrawer()}/>
        </Button>
      </Header>


      <Text style={{color:"white"}}>Page Classement</Text>

      <Content >

      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150, backgroundColor:"#E4E4E4"}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="General" value="General" />
        <Picker.Item label="Moyenne Basse" value="Moyenne basse" />
        <Picker.Item label="Moyenne Intermédiaire" value="Moyenne Intermédiaire" />
        <Picker.Item label="Moyenne Haute" value="Moyenne Haute" />
      </Picker>

      <Input placeholder='Rechercher' style={{backgroundColor:"#E4E4E4"}}></Input>
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 1, borderColor: 'grey'}}>
          <Row data={HeadTable} style={styles.HeadStyle} textStyle={styles.TableText}/>
          <Rows data={DataTable} textStyle={styles.TableText}/>
        </Table>
      </View>

      </Content>

    </ImageBackground>
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