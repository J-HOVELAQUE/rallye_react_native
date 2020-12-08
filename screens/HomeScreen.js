import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { Container, Header, Content, Footer, FooterTab, Icon, Accordion, Button } from 'native-base';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.26:3000/user/sign-up';

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
          console.log('User trouvé en db', answer);

          //// Record user connected on the reduce store /////
          props.onRecordUserConnected(answer.user)

        }
      } catch (e) {
        console.log('ERROR', e);
      }
    }
    getData();
  }, [])

  return (

    <ImageBackground source={require('../assets/fondCarbon.jpg')} style={styles.container}>

      <Header>
        <Button onPress={() => props.navigation.openDrawer()}>
          <Icon name='menu' style={{ color: 'white' }} />

        </Button>
      </Header>

      <View style={styles.container}>
        <Text style={{ color: 'white' }}>HomeScreen</Text>
        <Button
          title=" login "
          color='red'
          type="solid"

          onPress={() => navigation.navigate('Login')}
        />
      </View>


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
    onRecordUserConnected: function (user) {
      dispatch({
        type: 'record',
        user: user
      })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(HomeScreen);