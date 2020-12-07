import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';

class HomePage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={<Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />}
                />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>test menu</Text>
                </View>
            </View>
        );
    }
}

const CustomDrawerNavigation = (props) => {
  return (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ height: 250, backgroundColor: '#d2d2d2', opacity: 0.9 }}>
    <View style={{ height: 200, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
  <Image source={require('../assets/icon.png')} style={{ height: 150, width: 150, borderRadius: 60 }} />
  </View>
  <View style={{ height: 50, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
  <Text>John Doe</Text>
  </View>
  </View>
  <ScrollView>
  <DrawerItems {...props} />
  </ScrollView>
  <View style={{ alignItems: "center", bottom: 20 }}>
  <View style={{ flexDirection: 'row' }}>
  <View style={{ flexDirection: 'column', marginRight: 15 }}>
  <Icon name="flask" style={{ fontSize: 24 }} onPress={() => console.log("Tıkladın")} />
  </View>
  <View style={{ flexDirection: 'column' }}>
  <Icon name="call" style={{ fontSize: 24 }} onPress={() => console.log("Tıkladın")} />
  </View>
  </View>
  </View>
  </SafeAreaView>
  );
  }

  

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default HomePage;