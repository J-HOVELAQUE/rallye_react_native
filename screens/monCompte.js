import React, { useState } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Left, Body, Title, Right } from 'native-base';
import { View, Text } from 'react-native';
import { Input, Overlay } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { greyLightTa, GreyButtonOutline, PasswordInput } from '../components/rallye-lib'
import { FontAwesome } from '@expo/vector-icons';

// const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
const serverUrl = 'http://192.168.1.9:3000';

function monCompteScreen(props) {

  const [editable, setEditable] = useState(false)
  const [avatar, setAvatar] = useState(props.userConnected.avatar)
  const [firstName, setFirstName] = useState(props.userConnected.firstName)
  const [lastName, setLastName] = useState(props.userConnected.lastName)
  const [email, setEmail] = useState(props.userConnected.email)
  const [nationality, setNationality] = useState(props.userConnected.nationality)
  const [password, setPassword] = useState('')

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  // Fixed screen with personal informations
  const fixScreen = (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text>Avatar: {avatar !== undefined ? avatar : 'non renseignée'}</Text>
      <Text>Prenom: {firstName}</Text>
      <Text>Nom: {lastName}</Text>
      <Text>Nationalité: {nationality !== undefined ? nationality : 'non renseignée'}</Text>
      <Text>Email: {email}</Text>

      <GreyButtonOutline onPress={() => setEditable(true)} title='Modifier mes informations' backgroundColor={greyLightTa} />
      <GreyButtonOutline onPress={() => toggleOverlay()} title='Changer mon mot de passe' backgroundColor={greyLightTa} />

    </View>
  )

  // Editable screen to modify personal informations
  const editScreen = (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Avatar: {avatar !== undefined ?
        <Input
          placeholder={avatar}
          value={avatar}
          onChangeText={(value) => setAvatar(value)}
        />
        : <Input
          placeholder='Non renseigné'
          value={avatar}
          onChangeText={(value) => setAvatar(value)}
        />}
      </Text>

      <Text>Prenom:
        <Input
          placeholder={firstName}
          value={firstName}
          onChangeText={(value) => setFirstName(value)}
        />
      </Text>

      <Text>Nom:
        <Input
          placeholder={lastName}
          value={lastName}
          onChangeText={(value) => setLastName(value)}
        />
      </Text>

      <Text>Nationalité: {nationality !== undefined ?
        <Input
          placeholder={nationality}
          value={nationality}
          onChangeText={(value) => setNationality(value)}
        />
        : <Input
          placeholder='Non renseignée'
          value={nationality}
          onChangeText={(value) => setNationality(value)}
        />}
      </Text>

      <Text>Email:
        <Input
          placeholder={email}
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
      </Text>

      <GreyButtonOutline onPress={() => handleSaveNewProfile()} title='Enregistrer les modifications' backgroundColor={greyLightTa} />

    </View>
  )

  const overlayPassword = (
    <Overlay isVisible={visible} onBackdropPress={() => { toggleOverlay() }}>

      <Input
        inputContainerStyle={{ width: '70%' }}
        secureTextEntry={true}
        placeholder='Nouveau mot de passe'
        leftIcon={<FontAwesome name="unlock-alt" size={16} color={greyLightTa} />}
        value={password}
        onChangeText={(value) => setPassword(value)}
        rightIcon={<FontAwesome name="eye" size={16} color={greyLightTa} />}
      />
      <GreyButtonOutline onPress={() => handleChangePassword()} title='Valider la modification' backgroundColor={greyLightTa} />
      <GreyButtonOutline onPress={() => {toggleOverlay() ; setPassword('')}} title='Annuler' backgroundColor={greyLightTa} />

    </Overlay>
  )

  const handleChangePassword = async () => {
    toggleOverlay()
    // Modify password in BDD
    const rawAnswer = await fetch(`${serverUrl}/user/update-password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${props.userConnected.token}&newValue=${password}`
    })
    const answer = await rawAnswer.json();
    setPassword('')
    console.log(answer)
  }


  const handleSaveNewProfile = async () => {
    setEditable(false)

    // Create object for updating BDD
    const updateFields = {
      userFirstName: firstName,
      userLastName: lastName,
      userNationality: nationality,
      userEmail: email,
      userAvatar: avatar
    }

    const strUpdateFields = JSON.stringify(updateFields)

    // Modify user in BDD
    const rawAnswer = await fetch(`${serverUrl}/user/update-user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${props.userConnected.token}&newValue=${strUpdateFields}`
    })
    const answer = await rawAnswer.json();
    console.log(answer)
  }

  return (
    <Container >

      <Header style={{ backgroundColor: '#313131' }}>

        <Left>
          <Button transparent>
            <Icon name='ios-people' />
          </Button>
        </Left>
        <Body>
          <Title>Mon Compte</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => props.navigation.openDrawer()}>
            <Icon name='menu' />
          </Button>
        </Right>
      </Header>

      {overlayPassword}
      {editable === true ? editScreen : fixScreen}

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


function mapStateToProps(state) {
  return {
    userFavorites: state.userFavorites,
    userConnected: state.userConnected
  }
}

export default connect(
  mapStateToProps,
  null
)(monCompteScreen);