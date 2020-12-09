import React from 'react';
import { Header, Content, Button, Icon } from 'native-base';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

export default function MediaScreen(props) {

  return (
    <ImageBackground source={require('../assets/fondCarbon.jpg')} style={styles.container}>
      <Header style={{ backgroundColor: '#313131',width: 500}}>
        <Button style={{ backgroundColor: '#313131'}}>
        <Icon name='menu' style={{ color: 'white' }}  onPress={() => props.navigation.openDrawer()}/>
        </Button>
      </Header>

      <Content >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: "white" }}>Page Media</Text>
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
