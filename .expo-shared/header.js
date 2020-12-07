import React from 'react'
import { View , Text, StyleSheet } from 'react-native'

export default function Hearder(){
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.headerText}></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        
    }  
})