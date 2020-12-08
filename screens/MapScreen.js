import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';
import MapView, { Marker } from 'react-native-maps';

class MapScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={<Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />}
                />

                <MapView style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 48.866667,
                        longitude: 2.333333,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >

                </MapView>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default MapScreen;
