import React from 'react';
import { Header, Content, Button, Icon } from 'native-base';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';


export default function Team(props) {

  return (
    <ImageBackground source={require('../assets/fondCarbon.jpg')} style={styles.container}>

      <Header>
        <Button onPress={() => props.navigation.openDrawer()}>
          <Icon name='menu' style={{ color: 'white' }} />
        </Button>
      </Header>

      <Content >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: "white" }}>Page TEAM</Text>
        </View>
      </Content>

    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})