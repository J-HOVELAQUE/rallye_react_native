import React, { useState } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Left, Body, Title, Right, Thumbnail, Image } from 'native-base';
import { View, Text, TouchableHighlight } from 'react-native';
import { Input, Overlay } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

import { RedButtonLogin, RedButton, RallyeH1, RallyeH2, RallyeH3, InputDefault, greyDarkTa, whiteTa, icoWhite, PasswordInput, EmailInput, greyLightTa, GreyButtonOutline, redTa } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';

import HeaderRally from '../components/HeaderRally';
import FooterRally from '../components/FooterRally';
import { genericAvatarUrl } from '../tools/toolkit';

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

      <TouchableHighlight onPress={() => props.navigation.navigate('Snap')}>
        {(props.userConnected.avatar === null || props.userConnected.avatar === "" || props.userConnected.avatar === undefined) ?
          <Thumbnail
            onPress={() => props.navigation.navigate('Snap')}
            square large
            style={{ marginBottom: 40 }}
            source={{ uri: genericAvatarUrl }}
          /> :
          <Thumbnail
            onPress={() => props.navigation.navigate('Snap')}
            square large
            style={{ marginBottom: 40 }}
            source={{ uri: props.userConnected.avatar }}
          />}
      </TouchableHighlight >

      <Text style={{ marginBottom: 20 }}><RallyeH1 text={firstName + " " + lastName} /></Text>

      <Text style={{ marginBottom: 20 }}><Icon name='globe' size={15} style={{ color: greyDarkTa, marginRight: 10 }} /> {nationality !== undefined ? nationality.toUpperCase() : 'non renseignée'}</Text>

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

      <Text style={{ paddingLeft: 10 }}>Nationalité</Text>

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

    // Create object for reducer
    const newProfile = {
      firstname: firstName,
      lastname: lastName,
      nationality: nationality,
      email: email,
      avatar: avatar,
      token: props.userConnected.token,
      status: props.userConnected.status
    }

    props.onRecordUserConnected(newProfile);


    const strUpdateFields = JSON.stringify(updateFields)

    // Modify user in BDD
    const rawAnswer = await fetch(`${serverUrl}/user/update-user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${props.userConnected.token}&newValue=${strUpdateFields}`
    })
    const answer = await rawAnswer.json();
  }

  return (
    <Container >

      <HeaderRally openBurgerMenu={props.navigation.openDrawer}
        nav={props.navigation.navigate}
        titleHeader="MON COMPTE" />

      {overlayPassword}
      {editable === true ? editScreen : fixScreen}

      <FooterRally nav={props.navigation.navigate} />

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(monCompteScreen);