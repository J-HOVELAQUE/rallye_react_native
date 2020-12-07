import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';

function MenuScreen ({navigation}){
    return(
    <View style={styles.container}>
        
        <Button title='Home' onPress={() => navigation.navigate('Home')}/>
        <Button title='Teams' onPress={() => navigation.navigate('Team')}/>
        <Button title='Map' onPress={() => navigation.navigate('Map')}/>
        <Button title='Login' onPress={() => navigation.navigate('Login')}/>
        <Button title='Media' onPress={() => navigation.navigate('Media')}/>
        <Button title='Hebergement' onPress={() => navigation.navigate('Hebergement')}/>
        <Button title='Programme' onPress={() => navigation.navigate('Programme')}/>
        <Button title='Profil' onPress={() => navigation.navigate('Profil')}/>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center"
    }
});
export default MenuScreen;
