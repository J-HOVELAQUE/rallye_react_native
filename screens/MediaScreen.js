import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Container, Content } from 'native-base';
import Lightbox from 'react-native-lightbox';

import { RedButton } from '../components/rallye-lib';
import HeaderRally from '../components/HeaderRally';

function MediaScreen(props) {
  return (
    <Container >
      <HeaderRally openBurgerMenu={props.navigation.openDrawer}
        nav={props.navigation.navigate}
        titleHeader="MEDIA" />

      <Content>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View style={{ marginHorizontal: 10 }}>
            <RedButton onPress={() => props.navigation.navigate('Photos')} title="Photos" style={{ flex: 1, alignItems: 'flex-end' }} />
          </View>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
            <ScrollView style={styles.container}>

              <Lightbox underlayColor="white" >
                <Image
                  style={styles.contain}
                  resizeMode="contain"
                  source={{ uri: 'https://www.rallye-sport.fr/wp-content/uploads/2017/12/Calendrier-Epreuves-Historiques-2018.jpg' }} />
              </Lightbox>
            </ScrollView>
          </View>

          <View style={{ marginHorizontal: 10 }}>
            <RedButton onPress={() => props.navigation.navigate('Video')} title="Video" style={{ flex: 1, alignItems: 'flex-end' }} />
          </View>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
            <ScrollView style={styles.container}>
              <Lightbox underlayColor="white">
                <Image
                  style={styles.contain}
                  resizeMode="contain"
                  source={{ uri: 'https://www.sportmag.fr/wp-content/uploads/2020/08/Tour-de-Corse-historique.jpeg' }} />
              </Lightbox>
            </ScrollView>
          </View>
        </View>
      </Content>
    </Container>

  )
}
const styles = StyleSheet.create({ contain: { flex: 1, height: 150, }, container: { flex: 1, } });

export default MediaScreen