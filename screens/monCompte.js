import React, { useState } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Left, Body, Title, Right, Thumbnail, Image } from 'native-base';
import { View, Text } from 'react-native';
import { Input, Overlay } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

import { RedButtonLogin, RedButton, RallyeH1, RallyeH2, RallyeH3, InputDefault, greyDarkTa, whiteTa, icoWhite, PasswordInput, EmailInput, greyLightTa, GreyButtonOutline, redTa } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';
const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
// const serverUrl = 'http://192.168.1.9:3000';

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

      <Text>Avatar : {avatar !== undefined ? avatar : 'non renseignée'}</Text>
      <Thumbnail
        square large
        style={{ marginBottom: 40 }}
        source={{ uri: 'data:image/png;base64,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' }}
      />

      <Text style={{ marginBottom: 20 }}><RallyeH1 text={firstName + lastName} /></Text>

      {/* <Image source={{ uri: flagNationality(users.nationality) }} style={{ height: 10, width: 15 }} /> */}
      <Text style={{ marginBottom: 20 }}><Icon name='globe' size={15} style={{ color: greyDarkTa, marginRight: 10 }} /> {nationality !== undefined ? nationality : 'non renseignée'}</Text>
      <Text style={{ marginBottom: 40 }}><Icon name='envelope' size={15} style={{ color: greyDarkTa, marginRight: 10 }} /> {email}</Text>

      <RedButton onPress={() => setEditable(true)} title="Modifier mes informations" />
      <RedButton onPress={() => toggleOverlay()} title="Changer mon mot de passe" />

    </View>
  )

  // Editable screen to modify personal informations
  const editScreen = (
    <View
      style={{
        flex: 1,
        paddingBottom: 15,
        borderColor: greyDarkTa,
        paddingLeft: 10,
      }}>

      {avatar !== undefined ?
        <Input
          style={{ paddingLeft: 10 }}
          placeholder={avatar}
          value={avatar}
          onChangeText={(value) => setAvatar(value)}
        />
        : <Input
          placeholder='Non renseigné'
          value={avatar}
          onChangeText={(value) => setAvatar(value)}
        />}

      <Text style={{ paddingLeft: 10 }}>Prenom :</Text>
      <Input
        placeholder={firstName}
        value={firstName}
        onChangeText={(value) => setFirstName(value)}
      />


      <Text style={{ paddingLeft: 10 }}>Nom :</Text>
      <Input
        placeholder={lastName}
        value={lastName}
        onChangeText={(value) => setLastName(value)}
      />

      <Text style={{ paddingLeft: 10}}>Nationalité</Text>

      {nationality !== undefined ?
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


      <Text style={{ paddingLeft: 10 }}>Email :</Text>
      {/* <Input
          placeholder={email}
          value={email}
          onChangeText={(value) => setEmail(value)}
        /> */}
      <EmailInput onChangeText={(value) => setEmail(value)} />


      <RedButton onPress={() => handleSaveNewProfile()} title='Enregistrer les modifications' />

    </View>

  )

  const overlayPassword = (
    <Overlay isVisible={visible} onBackdropPress={() => { toggleOverlay() }}>
      <View>

        <Input
          inputContainerStyle={{ width: '100%' }}
          secureTextEntry={true}
          placeholder='Nouveau mot de passe'
          leftIcon={<FontAwesome name="unlock-alt" size={16} color={greyLightTa} />}
          value={password}
          onChangeText={(value) => setPassword(value)}
          rightIcon={<FontAwesome name="eye" size={16} color={greyLightTa} />}
        />
        <RedButton onPress={() => handleChangePassword()} title='Valider la modification' />
        <RedButton onPress={() => { toggleOverlay(); setPassword('') }} title='Annuler' />
      </View>

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

      <Header style={{ backgroundColor: greyDarkTa }}>
        <Left>
          <Icon name='bars' size={25} style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
        </Left>

        <Body>
          <Text style={{ color: whiteTa }}>MON COMPTE</Text>
        </Body>

        <Right>
          {props.userConnected.status === undefined ?
            <Icon name='user-circle' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
            :
            <Icon name='sign-out' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { AsyncStorage.clear(); props.resetUserConnected() ; props.navigation.navigate('Home') }} />
          }
        </Right>
      </Header>

      {overlayPassword}
      {editable === true ? editScreen : fixScreen}

      <Footer>
        <FooterTab style={{ backgroundColor: greyDarkTa, }}>
          <Button onPress={() => props.navigation.navigate('Home')}>
            <Icon name='tachometer' size={20} style={{ color: whiteTa }} />
            <Text style={{ color: whiteTa, fontSize: 9.5 }}>Rallye</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('Teams')} >
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


function mapStateToProps(state) {
  return {
    userFavorites: state.userFavorites,
    userConnected: state.userConnected
  }
}


function mapDispatchToProps(dispatch) {
  return {
    resetUserConnected: function () {
      dispatch({
        type: 'reset'
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(monCompteScreen);