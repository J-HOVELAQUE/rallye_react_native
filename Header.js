import React from 'react'
import { View , Text, StyleSheet } from 'react-native'
import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';

export default function Hearder({navigation}){
    console.log(navigation)
    return (
        <View style={styles.container}>
            <Header
                rightComponent={<Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        
    }  
})