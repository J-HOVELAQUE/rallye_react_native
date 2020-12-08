import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Button, Input } from 'react-native-elements'
import { connect } from 'react-redux';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.26:3000/user/sign-up';


function LoginScreen(props) {

  const [emailSignIn, setEmailSignIn] = useState(null);
  const [passwordSignIn, setPasswordSignIn] = useState(null);

  const [firstname, setFirstname] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  //////////////////////////////////////////////////////////////////
  async function processSignUp() {

    const dataUser = {
      name: name,
      firstname: firstname,
      email: email,
      password: password
    }

    ///// Sending request to server //////
    const rawAnswer = await fetch(serverUrl + '/user/sign-up', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataUser)
    });
    const answer = await rawAnswer.json();

    ///// Recording in reduce store if answer is ok //////
    if (answer.recorded === true) {
      props.onRecordUserConnected(answer.data);
      AsyncStorage.setItem("token", JSON.stringify(answer.data.token));
      props.navigation.navigate('Map');
    } else {
      console.log('Access denied', answer.error);
    }
  }

  //////////////////////////////////////////////////////////////////
  async function processSignIn() {

    const dataUser = {
      email: emailSignIn,
      password: passwordSignIn
    }

    ///// Sending request to server //////
    const rawAnswer = await fetch(serverUrl + '/user/sign-in', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataUser)
    });
    const answer = await rawAnswer.json();

    ///// Recording in reduce store and local storage if answer is ok //////
    if (answer.result === true) {
      props.onRecordUserConnected(answer.data);
      AsyncStorage.setItem("token", JSON.stringify(answer.data.token));
      props.navigation.navigate('Map');
    } else {
      console.log('Access denied', answer.error);

    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#e67e22', alignItems: "center", justifyContent: "center" }}>
      <Text>SIGN IN</Text>
      <Input
        containerStyle={{ marginBottom: 25, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='Email'
        onChangeText={(val) => setEmailSignIn(val)}
      />
      <Input
        containerStyle={{ marginBottom: 25, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='Password'
        onChangeText={(val) => setPasswordSignIn(val)}
      />
      <Button
        title="Send"
        type="solid"
        onPress={() => { processSignIn() }}
      />

      <Text>SIGN UP</Text>
      <Input
        containerStyle={{ marginBottom: 25, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='First Name'
        onChangeText={(val) => setFirstname(val)}
      />
      <Input
        containerStyle={{ marginBottom: 25, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='Name'
        onChangeText={(val) => setName(val)}
      />
      <Input
        containerStyle={{ marginBottom: 25, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='Email'
        onChangeText={(val) => setEmail(val)}
      />
      <Input
        containerStyle={{ marginBottom: 25, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='Password'
        onChangeText={(val) => setPassword(val)}
      />

      <Button
        title="Send"
        type="solid"
        onPress={() => { processSignUp() }}
      />
    </View>
  );
}

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
)(LoginScreen);