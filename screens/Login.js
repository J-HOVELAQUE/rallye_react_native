import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements'
import { connect } from 'react-redux';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com/user/sign-up';
// const serverUrl = 'http://192.168.1.26:3000/user/sign-up';


function LoginScreen(props) {

  const [emailSignIn, setEmailSignIn] = useState(null);
  const [passwordSignIn, setPasswordSignIn] = useState(null);

  const [firstname, setFirstname] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  async function processSignUp() {

    const dataUser = {
      name: name,
      firstname: firstname,
      email: email,
      password: password
    }

    const rawAnswer = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataUser)
    });

    const answer = await rawAnswer.json();

    // console.log('Answer', answer);

    if (answer.recorded === true) {
      props.onRecordUserConnected(answer.data);
      props.navigation.navigate('Map');
    } else {
      console.log('Access denied', answer.error);
    }
  }

  async function processSignIn() {

    const dataUser = {
      email: emailSignIn,
      password: passwordSignIn
    }

    const rawAnswer = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataUser)
    });

    const answer = await rawAnswer.json();
    // console.log('Answer', answer);

    if (answer.result === true) {
      props.onRecordUserConnected(answer.user);
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
        onPress={() => {
          processSignIn(),
            console.log('pouet');
        }}
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