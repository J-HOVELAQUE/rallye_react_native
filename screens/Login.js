import React, { useState } from 'react';
import { Text, View, KeyboardAvoidingView } from 'react-native';
import { Content, Button, Container } from 'native-base';
import { Input, Overlay } from 'react-native-elements'
import { connect } from 'react-redux';

import { whiteTa, greyDarkTa, RedButton, RallyeH3, EmailInput, PasswordInput, UserInput } from '../components/rallye-lib';

import { storeData } from '../tools/toolkit';
import HeaderRally from '../components/HeaderRally';
import FooterRally from '../components/FooterRally';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';

function LoginScreen(props) {

  const [emailSignIn, setEmailSignIn] = useState(null);
  const [passwordSignIn, setPasswordSignIn] = useState(null);

  const [firstname, setFirstname] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState([]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  /////////////// SIGN UP //////////////////////
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
    console.log(answer);

    ///// Recording in reduce store and local if answer is ok //////
    if (answer.recorded === true) {
      props.onRecordUserConnected(answer.data);
      storeData(answer.data.token, answer.data.status);

      props.navigation.navigate('Home');
    } else {
      console.log('Access denied', answer.error);
      setErrors(answer.error);
      toggleOverlay();
    }
  }

  /////////////// SIGN IN //////////////////////
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
      storeData(answer.data.token, answer.data.status);
      props.navigation.navigate('Home');
    } else {
      console.log('Access denied', answer.error);
      setErrors(answer.error);
      toggleOverlay();

    }
  }

  return (
    <Container>
      <HeaderRally openBurgerMenu={props.navigation.openDrawer}
        nav={props.navigation.navigate}
        titleHeader="INSCRIPTION/CONNECTION" />

      <Content>
        <View style={{ flex: 1, backgroundColor: whiteTa, alignItems: "center", justifyContent: "center" }}>
          <Overlay isVisible={visible} onBackdropPress={() => { toggleOverlay() }}>
            <View>
              {errors.map((err, i) => { return (<Text key={i}>{err}</Text>) })}
              <Button
                title="OK"
                buttonStyle={{ backgroundColor: "#eb4d4b" }}
                type="solid"
                onPress={() => { toggleOverlay() }}
              />
            </View>
          </Overlay>

          <RallyeH3 text="SE CONNECTER" />

          <View
            style={{
              width: '90%',
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 15,
              borderRadius: 5,
              borderColor: greyDarkTa,
              borderStyle: 'solid',
              borderWidth: 1,
              paddingLeft: 10,
            }}>

            <KeyboardAvoidingView behavior="padding" enabled style={{ width: '100%' }}>
              <EmailInput onChangeText={(val) => setEmailSignIn(val)} />
              <PasswordInput onChangeText={(val) => setPasswordSignIn(val)} />
              <RedButton onPress={() => { processSignIn() }} title="Se connecter" />
            </KeyboardAvoidingView>

          </View>

          <RallyeH3 text="CREER UN COMPTE" />

          <View style={{
            width: '90%',
            borderStyle: 'solid',
            borderColor: greyDarkTa,
            marginTop: 10,
            marginBottom: '5%',
            borderColor: greyDarkTa,
            borderRadius: 5,
            borderWidth: 1,
            alignItems: "center",
            justifyContent: 'center',
            paddingTop: 15,
            paddingLeft: 10,
          }}>

            <KeyboardAvoidingView behavior="padding" enabled style={{ width: '100%' }}>
              <UserInput placeholder='Prénom' onChangeText={(val) => setFirstname(val)} />
              <UserInput placeholder='Nom' onChangeText={(val) => setName(val)} />
              <EmailInput style={{ width: '100%', }} onChangeText={(val) => setEmail(val)} />
              <PasswordInput onChangeText={(val) => setPassword(val)} />
              <RedButton onPress={() => { processSignUp() }} title="S'inscrire" />
            </KeyboardAvoidingView>
          </View>
        </View>
      </Content>

      <FooterRally nav={props.navigation.navigate} />

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
    resetUserConnected: function () {
      dispatch({
        type: 'reset'
      })
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.userConnected,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);