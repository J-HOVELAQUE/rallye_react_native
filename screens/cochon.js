import { Container } from 'native-base';
import React from 'react';
import { Image, ScrollView, StyleSheet, } from 'react-native';
import Lightbox from 'react-native-lightbox';
import { Text, Container, Header, Left, Body, Right } from 'native-base';
import { greyDarkTa, whiteTa, icoWhite } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';

export default (props) => (
  <Container>

    <Header style={{ backgroundColor: greyDarkTa }}>
      <Left>
        <Icon name='bars' size={25} style={{ color: icoWhite, marginLeft: 10 }} onPress={() => props.navigation.openDrawer()} />
      </Left>

      <Body>
        <Text style={{ color: whiteTa }}>TEST</Text>
      </Body>

      <Right>
        <Icon name='user-circle' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
      </Right>
    </Header>

    <ScrollView style={styles.container}>
      <Lightbox underlayColor="white">
        <Image
          style={styles.contain}
          resizeMode="contain"
          source={{ uri: 'https://www.yayomg.com/wp-content/uploads/2014/04/yayomg-pig-wearing-party-hat.jpg' }} />
      </Lightbox>
    </ScrollView>

  </Container>
)

const styles = StyleSheet.create({ contain: { flex: 1, height: 150, } });
