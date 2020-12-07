import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';

class HomePage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header
                    rightComponent={<Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />}
                />
                <View style={{ flex: 1, backgroundColor:'#e67e22', alignItems: "center",justifyContent: "center"}}>
                    <Text>test menu page Map</Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default HomePage;