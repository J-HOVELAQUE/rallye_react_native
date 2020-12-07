import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements'


export default function LoginScreen() {

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

    await fetch('http://192.168.1.26:3000/user/sign-up', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataUser)
    })
  }

  async function processSignIn() {

    const dataUser = {
      emailSignIn: email,
      passwordSignIn: password
    }

    await fetch('http://192.168.1.26:3000/user/sign-in', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataUser)
    })
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
        onPress={() => { processSignIn }}
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