import React, { useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, AsyncStorage, Divider } from 'react-native';
import { Input, Overlay } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { Header, Content, Button, Card, CardItem, Footer, FooterTab, Right, Left, Body, Title, Container } from 'native-base';

// Importer la librairie de composants
import {
  redTa, whiteTa, icoWhite, blackTa, greyDarkTa, greyLightTa, RedButton, RallyeH3, EmailInput, PasswordInput, UserInput
} from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.9:3000';

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

  // SIGN UP
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

    ///// Recording in reduce store if answer is ok //////
    if (answer.recorded === true) {
      props.onRecordUserConnected(answer.data);
      const storeData = async () => {

        const dataToken = answer.data.token;

        try {
          await AsyncStorage.setItem('token', dataToken)
        } catch (e) {
          // saving error
          console.log('ERROR', e);
        }

        const dataStatus = answer.data.status
        try {
          await AsyncStorage.setItem('status', dataStatus)
        } catch (e) {
          // saving error
          console.log('ERROR', e);
        }
      }

      storeData();

      // AsyncStorage.setItem("token", JSON.stringify(answer.data.token));
      props.navigation.navigate('Home');
    } else {
      console.log('Access denied', answer.error);
      setErrors(answer.error);
      toggleOverlay();
    }
  }

  // SIGN IN
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
    console.log('ANSWER', answer);

    ///// Recording in reduce store and local storage if answer is ok //////
    if (answer.result === true) {
      props.onRecordUserConnected(answer.data);

      const data = answer.data.token;

      try {
        await AsyncStorage.setItem('token', data)
      } catch (e) {
        // saving error
        console.log('ERROR', e);
      }
      props.navigation.navigate('Home');
    } else {
      console.log('Access denied', answer.error);
      setErrors(answer.error);
      toggleOverlay();

    }
  }

  return (
    <Container>
      <Header style={{ backgroundColor: greyDarkTa }}>
        <Left>
          <Icon name='bars' size={25} style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
        </Left>

        <Body>
          <Text style={{ color: whiteTa }}>INSCRIPTION / CONNECTION</Text>
        </Body>

        <Right>
          {props.user.status === undefined ?
            <Icon name='user-circle' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
            :
            <Icon name='sign-out' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { AsyncStorage.clear(); props.resetUserConnected(); props.navigation.navigate('Home') }} />
          }
        </Right>
      </Header>

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

          {/* <ScrollView> */}
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
              // backgroundColor: redTa,
            }}>



            {/* <KeyboardAvoidingView behavior="padding" enabled> */}

            <EmailInput onChangeText={(val) => setEmailSignIn(val)} />

            <PasswordInput onChangeText={(val) => setPasswordSignIn(val)} />

            <RedButton onPress={() => { processSignIn() }} title="Se connecter" />

            {/* </KeyboardAvoidingView> */}

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

            {/* <KeyboardAvoidingView behavior="padding" enabled> */}

            <UserInput placeholder='Prénom' onChangeText={(val) => setFirstname(val)} />

            <UserInput placeholder='Nom' onChangeText={(val) => setName(val)} />

            <EmailInput style={{ width: '100%', }} onChangeText={(val) => setEmail(val)} />

            <PasswordInput onChangeText={(val) => setPassword(val)} />

            <RedButton onPress={() => { processSignUp() }} title="S'inscrire" />

            {/* </KeyboardAvoidingView> */}
          </View>


          {/* </ScrollView > */}
        </View>
      </Content>

      <Footer>
        <FooterTab style={{ backgroundColor: greyDarkTa, }}>
          <Button onPress={() => props.navigation.navigate('Home')}>
            <Icon name='tachometer' size={20} style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Rallye</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Pilotes')} >
            <Icon name='car' size={20} style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Pilotes</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Classement')}>
            <Icon name='trophy' size={20} style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Résultats</Text>
          </Button >
          <Button onPress={() => props.navigation.navigate('Map')}>
            <Icon name='map' size={20} style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Map</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Medias')}>
            <Icon name='image' size={20} style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Medias</Text>
          </Button>
        </FooterTab>
      </Footer>
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