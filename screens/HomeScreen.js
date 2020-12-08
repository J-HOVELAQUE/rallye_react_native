import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { AsyncStorage } from '@react-native-community/async-storage';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default function HomeScreen({ navigation }) {


  return (
    <ImageBackground source={require('../assets/fondCarbon.jpg')} style={styles.container}>
      <View style={styles.container}>
        <Text style={{ color: 'white' }}>HomeScreen</Text>
        <Button
          title=" login "
          color='red'
          type="solid"

          onPress={() => navigation.navigate('Login')}
        />
      </View>

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
