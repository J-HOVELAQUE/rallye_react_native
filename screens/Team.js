import React, { useState } from 'react';
import { Header, Content, Button, Icon, Card, CardItem, Text, Right, Left, Body } from 'native-base';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';
import { connect } from 'react-redux'


function Team(props) {

  // console.log(props.userConnected.status)
  const [styleHeart, setStyleHeart] = useState({ color: 'gray' })
  console.log("my favoris : ", props.userFavorites)

  const handleFavorite = (numTeam) => {
    console.log('team cliquée', numTeam)
    let index = props.userFavorites.indexOf(numTeam)

    // Add or Remove this team from my favorites
    if (index < 0) {
      props.addFavoriteTeam(numTeam)
      setStyleHeart({ color: 'red' })
    } else {
      props.removeFavoriteTeam(numTeam)
      setStyleHeart({ color: 'gray' })
    }
  }


  return (
    <ImageBackground source={require('../assets/fondCarbon.jpg')} style={styles.container}>

      <Header style={{ backgroundColor: '#313131', width: 500, }}>
        <Button style={{ backgroundColor: '#313131' }}>
          <Icon name='menu' style={{ color: 'white' }} onPress={() => props.navigation.openDrawer()} />
        </Button>
      </Header>

      <Content >
        <Card style={{ width: 350, flex: 1 }}>
          <CardItem >
            <Left>
              <Text>#001</Text>
            </Left>
            <Body>
              <Text>
                <Image source={require('../assets/flag-french.png')} style={{ height: 10, width: 10, flex: 1 }} />
                  Pilote 1</Text>
              <Text></Text>
              <Text>
                <Image source={require('../assets/flag-french.png')} style={{ height: 10, width: 10, flex: 1 }} />
                  Pilote 2</Text>
            </Body>
            <Image source={require('../assets/206.jpg')} style={{ height: 50, width: null, flex: 1 }} />
            <Right>
              {props.userConnected.status === undefined ? <Icon/> : <Icon name="heart" style={styleHeart} onPress={() => { handleFavorite('001') }} />}
              <Text></Text>
              <Icon name="locate" />
            </Right>
          </CardItem>
        </Card>
      </Content>

    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})


function mapDispatchToProps(dispatch) {
  return {
    addFavoriteTeam: function (numTeam) {
      dispatch({
        type: 'addFavoriteTeam',
        numTeam
      })
    },
    removeFavoriteTeam: function (numTeam) {
      dispatch({
        type: 'removeFavoriteTeam',
        numTeam
      })
    }
  }
}

function mapStateToProps(state) {
  return {
    userFavorites: state.userFavorites,
    userConnected: state.userConnected
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Team);