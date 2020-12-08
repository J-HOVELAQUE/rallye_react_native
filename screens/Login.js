import React, { useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Overlay } from 'react-native-elements'
import { connect } from 'react-redux';
import { Container, Header, Content, Footer, FooterTab, Icon } from 'native-base';


const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.26:3000/user/sign-up';


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
      props.navigation.navigate('Map');
    } else {
      console.log('Access denied', answer.error);
      setErrors(answer.error);
      toggleOverlay();
    }
  }

  //////////////////////////////////////////////////////////////////
  async function processSignIn() {
    console.log('pouet');

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

    ///// Recording in reduce store if answer is ok //////
    if (answer.result === true) {
      props.onRecordUserConnected(answer.data);
      props.navigation.navigate('Map');
    } else {
      console.log('Access denied', answer.error);
      setErrors(answer.error);
      toggleOverlay();

    }
  }

  return (
    <Container>
        <Header>
              <Icon onPress={() => this.props.navigation.openDrawer()}style={{color:'white'}}name="home" />
        </Header>
        <Content>

          
          <View style={{ flex: 1, backgroundColor: '#e67e22', alignItems: "center", justifyContent: "center" }}>
            <Overlay isVisible={visible} onBackdropPress={() => { toggleOverlay() }}>
              <View>
                {errors.map(err => { return (<Text>{err}</Text>) })}
                <Button
                  title="OK"
                  buttonStyle={{ backgroundColor: "#eb4d4b" }}
                  type="solid"
                  onPress={() => { toggleOverlay() }}
                />
              </View>
            </Overlay>

            {/* <ScrollView> */}

              <Text style={{paddingTop:10}}>SIGN IN</Text>
              <View style={{
                width: '90%',
                height: 200,
                backgroundColor: 'gray',
                marginBottom: '5%',
                borderColor: 'red',
                borderRadius: 20,
                flex: 1,
                alignItems: "center",
                justifyContent: 'center', 
                paddingLeft: 10,
              }}>

                {/* <KeyboardAvoidingView behavior="padding" enabled> */}
                  <Input
                    containerStyle={{ width: '90%', height: '25%' }}
                    inputStyle={{ marginLeft: 10 }}
                    inputContainerStyle={{borderTopColor:'red'}}
                    placeholder='Email'
                    onChangeText={(val) => setEmailSignIn(val)}
                  />
                  <Input
                    containerStyle={{ width: '90%', height: '25%' }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder='Password'
                    onChangeText={(val) => setPasswordSignIn(val)}
                  />
              
                  <Button
                    title="Send"
                    type="solid"
                    containerStyle={{margin: 10}}
                    onPress={() => {
                      processSignIn();
                    }}
                  />
                {/* </KeyboardAvoidingView> */}
              </View>
            
              <Text>SIGN UP</Text>
              <View style={{
                width: '90%',
                height: 350,
                backgroundColor:'white',
                borderRadius: 20,
                flex: 1,
                alignItems: "center",
                justifyContent: 'center', 
                paddingLeft: 10,
                marginBottom: 10
              }}>

                {/* <KeyboardAvoidingView behavior="padding" enabled> */}
                  <View style={{
                    width: '80%',
                    height: '80%',
                    justifyContent: 'center'
                  }}>

                    <Input
                      containerStyle={{width: '90%', height: '20%' }}
                      inputStyle={{ marginLeft: 10 }}
                      placeholder='First Name'
                      onChangeText={(val) => setFirstname(val)}
                    />
                    <Input
                      containerStyle={{ width: '90%', height: '20%'  }}
                      inputStyle={{ marginLeft: 10 }}
                      placeholder='Name'
                      onChangeText={(val) => setName(val)}
                    />
                    <Input
                      containerStyle={{ width: '90%', height: '20%'  }}
                      inputStyle={{ marginLeft: 10 }}
                      placeholder='Email'
                      onChangeText={(val) => setEmail(val)}
                    />
                    <Input
                      containerStyle={{ width: '90%', height: '20%'  }}
                      inputStyle={{ marginLeft: 10 }}
                      placeholder='Password'
                      onChangeText={(val) => setPassword(val)}
                    />
                  </View>

                  <Button
                    title="Send"
                    type="solid"
                    onPress={() => { processSignUp() }}
                  />
                {/* </KeyboardAvoidingView> */}
              </View>

            {/* </ScrollView > */}
          </View>
        </Content>

        <Footer>
          <FooterTab style={{backgroundColor: '#313131',}}>
            <Button onPress={() => this.props.navigation.navigate('Home')}>
              <Icon style={{color:'white'}} name="home" />
              <Text style={{color:'white'}}>Home</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Team')}>
              <Icon style={{color:'white'}} name="car" />
              <Text style={{color:'white'}}>Team</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Classement')}>
              <Icon style={{color:'white'}} name="add" />
              <Text style={{color:'white'}}>Podium</Text>
            </Button >
            <Button onPress={() => this.props.navigation.navigate('Map')}>
              <Icon style={{color:'white'}}name="map" />
              <Text style={{color:'white'}}>Map</Text>
            </Button>
            <Button onPress={() => this.props.navigation.openDrawer()}>
            <Icon style={{color:'white'}}name="menu"  />
            <Text style={{color:'white'}}>Menu</Text>
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