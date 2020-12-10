import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Accordion,Left,Title,Body,Right } from 'native-base';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.9:3000';

function HomeScreen(props) {

  useEffect(() => {
    const getData = async () => {

      //// Getting data in local storage if existing ////
      try {
        const value = await AsyncStorage.getItem('token')
        if (value !== null) {

          const rawAnswer = await fetch(`${serverUrl}/user/get-user?token=${value}`, {
            method: 'GET',
          });
          const answer = await rawAnswer.json();
          // console.log('User trouvé en db', answer);

          //// Record user connected on the reduce store /////
          props.onRecordUserConnected(answer.user)
          props.retrieveFavoriteTeam(answer.user.favorite)
        }
      } catch (e) {
        console.log('ERROR', e);
      }
    }
    getData();
  }, [])

  return (
<Container>
    
<Header style={{ backgroundColor: '#313131'}}>
          <Left>
            <Button transparent>
              <Icon name='ios-people' />
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        <ImageBackground source={require('../assets/fondCarbon.jpg')} style={{flex:1}}>

      <Content >
      
      <View style={{ flex: 1, alignItems:"center" ,flexDirection: 'row',justifyContent: 'space-between',margin:5}}>
        <Button style={{ flex:1 ,alignItems:"center",justifyContent:"center",backgroundColor:"red",width:"40%"}} onPress={() => props.navigation.navigate('Login')}>
            <Icon name='home' />
            <Text >Login</Text>
          </Button>
       </View>   
      
      </Content>

    </ImageBackground>
    </Container>
  );
}



function mapDispatchToProps(dispatch) {
  return {
    onRecordUserConnected: function (user) {
      dispatch({
        type: 'record',
        user: user
      })
    },
    retrieveFavoriteTeam: function(listFavorites){
      dispatch({
        type: 'retrieveFavoriteTeam',
        listFavorites: listFavorites
      })
    }
  }
}

function mapStateToProps(state){
  return {
    favorites: state.userFavorites
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);