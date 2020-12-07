import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements'


export default function LoginScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#e67e22', alignItems: "center", justifyContent: "center" }}>
      <Text>SIGN IN</Text>
      <Input
        containerStyle={{ marginBottom: 25, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='Email'
        onChangeText={(val) => setPseudo(val)}
      />
      <Input
        containerStyle={{ marginBottom: 25, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='Password'
        onChangeText={(val) => setPseudo(val)}
      />
      <Button
        title="Send"
        type="solid"
      />

      <Text>SIGN UP</Text>
      <Input
        containerStyle={{ marginBottom: 25, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='First Name'
        onChangeText={(val) => setPseudo(val)}
      />
      <Input
        containerStyle={{ marginBottom: 25, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='Name'
        onChangeText={(val) => setPseudo(val)}
      />
      <Input
        containerStyle={{ marginBottom: 25, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='Email'
        onChangeText={(val) => setPseudo(val)}
      />
      <Input
        containerStyle={{ marginBottom: 25, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='Password'
        onChangeText={(val) => setPseudo(val)}
      />

      <Button
        title="Send"
        type="solid"
      />
    </View>
  );
}