import React from 'react';
import { View } from 'react-native';

import {createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import TeamScreen from './screens/Team';
import ClassementScreen from './screens/Classement';
import Login from './screens/Login';
import Header from './Header'


var BottomNavigator = createBottomTabNavigator(
  {
    Home: {screen: HomeScreen, navigationOptions:{headerTitle: ()=> <Header />}},
    Team: TeamScreen,
    Classement: ClassementScreen,
    Map: MapScreen,
    
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        var iconName;
        if (navigation.state.routeName == 'Home') {
          iconName = 'ios-home';
        } else if (navigation.state.routeName == 'Team') {
          iconName = 'ios-car';
        }else if (navigation.state.routeName == 'Classement') {
          iconName = 'ios-trophy';
        }else if (navigation.state.routeName == 'Map') {
          iconName = 'ios-map';
        }else if (navigation.state.routeName == 'Menu') {
          iconName="ios-menu";
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'white',
      style: {
        backgroundColor: '#313131',
      }
    },
  }
);

const MyDrawerNavigator = createDrawerNavigator(
  {
    MapBurger: BottomNavigator,
    Teams: TeamScreen
  },
  {
    drawerPosition: "right",
    drawerType: "front",
    drawerWidth: "100%"
  }
);


const CustomDrawerNavigation = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: 250, backgroundColor: '#d2d2d2', opacity: 0.9 }}>
        <View style={{ height: 200, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('./assets/icon.png')} style={{ height: 150, width: 150, borderRadius: 60 }} />
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


const MyApp = createAppContainer(MyDrawerNavigator);

export default function App(){
  return (
    <MyApp />
  )
}


// var Navigation = createAppContainer(BottomNavigator);
// export default MyApp;