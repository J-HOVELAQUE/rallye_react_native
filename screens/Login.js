import React, { useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, AsyncStorage, Divider } from 'react-native';
import { Input, Overlay } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Container, Header, Content, Footer, FooterTab, Icon, Button } from 'native-base';

// Importer la librairie de composants
import {
  redTa, whiteTa, blackTa, greyDarkTa, greyLightTa, RedButton, RallyeH3, EmailInput, PasswordInput, UserInput
} from '../components/rallye-lib';

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
      props.navigation.navigate('Map');
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
      <Header style={{ backgroundColor: 'white' }}>
        <Button style={{ backgroundColor: '#263238', width: 50 }} onPress={() => props.navigation.openDrawer()}>
          <Icon name='menu' style={{ color: '#FFFFFF' }} />
        </Button>
      </Header>

      <Content>
        <View style={{ flex: 1, backgroundColor: '#FFFFFF', alignItems: "center", justifyContent: "center" }}>
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
        <FooterTab style={{ backgroundColor: '#313131', }}>
          <Button onPress={() => props.navigation.navigate('Home')}>
            <Ionicons name='ios-home' size={25} color='white' />
            <Text style={{ color: 'white', fontSize: 10 }}>Home</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Teams')}>
            <Ionicons name='ios-car' size={25} color='white' />
            <Text style={{ color: 'white', fontSize: 10 }}>Teams</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Classement')}>
            <Ionicons name='ios-trophy' size={25} color='white' />
            <Text style={{ color: 'white', fontSize: 10 }}>Classement</Text>
          </Button >
          <Button onPress={() => props.navigation.navigate('Map')}>
            <Ionicons name='ios-map' size={25} color='white' />
            <Text style={{ color: 'white', fontSize: 10 }}>Map</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Medias')}>
            <Ionicons name='ios-images' size={25} color='white' />
            <Text style={{ color: 'white', fontSize: 10 }}>Medias</Text>
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
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(LoginScreen);