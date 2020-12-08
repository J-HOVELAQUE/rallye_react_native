import React, { Component } from 'react';
import { View,Button, Text, StyleSheet } from 'react-native';
import { Left, Right, Icon } from 'native-base';


function MenuScreen ({navigation}){
    return(
        <View >
            <View style={{justifyContent:'space-between'}}>
        <View style={{margin:10}}><Button title='Teams' onPress={() => navigation.navigate('Team')}/></View>
        <Button title='Home' onPress={() => navigation.navigate('Home')}><Icon name="home"/></Button>
        <Button title='Teams' onPress={() => navigation.navigate('Team')}/>
        <Button title='Map' onPress={() => navigation.navigate('Map')}/>
        <Button title='Login' onPress={() => navigation.navigate('Login')}/>
        <Button title='Média' onPress={() => navigation.navigate('Media')}/>
        <Button title='Hebergement' onPress={() => navigation.navigate('Hebergement')}/>
        <Button title='Programme' onPress={() => navigation.navigate('Programme')}/>
        <Button title='Profil' onPress={() => navigation.navigate('Profil')}/>
        <Button title='Librairie' onPress={() => navigation.navigate('Librairie')}/>
        </View>
    </View>
    )
}
export default MenuScreen;
