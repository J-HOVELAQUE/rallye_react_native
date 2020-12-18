import React, { useState } from 'react';
import { Text, View, KeyboardAvoidingView } from 'react-native';
import { Content, Button, Container } from 'native-base';
import { Input, Overlay } from 'react-native-elements'
import { connect } from 'react-redux';

import { whiteTa, greyDarkTa, RedButton, RallyeH1, RallyeH3, EmailInput, PasswordInput, UserInput, redTa } from '../components/rallye-lib';

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

    ///// Recording in reduce store and local if answer is ok //////
    if (answer.recorded === true) {
      props.onRecordUserConnected(answer.data);
      storeData(answer.data.token, answer.data.status);

      props.navigation.navigate('Home');
    } else {
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
        <View style={{ flex: 1, backgroundColor: greyDarkTa, alignItems: "center", justifyContent: "center" }}>
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



          <View
            style={{
              width: '90%',
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 5,
              borderColor: greyDarkTa,
              borderStyle: 'solid',
              borderWidth: 1,
              paddingLeft: 10,
              backgroundColor: whiteTa,
              marginVertical: 20
            }}>
            <RallyeH1 text="SE CONNECTER" />

            <KeyboardAvoidingView behavior="padding" enabled style={{ width: '100%' }}>
              <EmailInput onChangeText={(val) => setEmailSignIn(val)} />
              <PasswordInput onChangeText={(val) => setPasswordSignIn(val)} />
              <RedButton onPress={() => { processSignIn() }} title="Se connecter" />
            </KeyboardAvoidingView>

          </View>



          <View style={{
            width: '90%',
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 5,
            borderColor: greyDarkTa,
            borderStyle: 'solid',
            borderWidth: 1,
            paddingLeft: 10,
            backgroundColor: whiteTa,
            marginVertical: 20
          }}>

            <RallyeH1 text="CREER UN COMPTE" />
            <Text style={{ fontFamily: 'Roboto_700Bold', fontSize: 15, color: redTa, textAlign: 'left'}} >Pourquoi me créer une compte ?</Text>
            <Text style={{textAlign: 'center', marginVertical: 10}}>Vous pourrez ainsi débloquer des fonctionnalités en ajoutant des pilotes à vos favoris. AInsi, vous pourrez les suivre en direct pendant le rallye !</Text>

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