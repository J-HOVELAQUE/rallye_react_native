import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Container, Content } from 'native-base';

import { RedButton } from '../components/rallye-lib';
import HeaderRally from '../components/HeaderRally';
import { pictoUrl } from '../tools/toolkit';

function MediaScreen(props) {
  return (
    <Container >
      <HeaderRally openBurgerMenu={props.navigation.openDrawer}
        nav={props.navigation.navigate}
        titleHeader="MEDIA" />

      <Content >
        <View style={{ flex: 1, }}>


          <View >
            <RedButton onPress={() => props.navigation.navigate('Photos')} title="Photos" style={{ flex: 1, }} />
          </View>
          <TouchableOpacity onPress={() => props.navigation.navigate('Photos')}>
            <Image source={{ uri: 'https://www.sportmag.fr/wp-content/uploads/2020/08/Tour-de-Corse-historique.jpeg' }}
              style={{ height: 150, width: 250, flex: 1, marginLeft: "15%", }} />
          </TouchableOpacity>

          <RedButton onPress={() => props.navigation.navigate('Video')} title="Video" />

          <TouchableOpacity onPress={() => props.navigation.navigate('Video')}>
            <Image source={{ uri: pictoUrl }}
              style={{ height: 150, width: 250, flex: 1, marginLeft: "15%" }} />
          </TouchableOpacity>
        </View>
      </Content>
    </Container>

  )
}
const styles = StyleSheet.create({ contain: { flex: 1, height: 150, }, container: { flex: 1, } });

export default MediaScreen