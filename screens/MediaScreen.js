import React from 'react';
import { View, Text, StyleSheet, ImageBackground , Image,ScrollView} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Card,CardItem,Content } from 'native-base';
import Lightbox from 'react-native-lightbox';

export default function MediaScreen(props) {
  return (
    
    <Container>
        <Header style={{ backgroundColor: '#313131'}}>
          <Left>
            <Button transparent>
              <Icon name='ios-people' />
            </Button>
          </Left>
          <Body>
            <Title>Media</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        <ImageBackground source={require('../assets/fondCarbon.jpg')} style={styles.container}>

        <Content>
          <View style={{alignItems:"center",justifyContent:"center"}}>

           <Button style={{ flex: 1,  justifyContent: "center", backgroundColor: "red", width: "40%" }} onPress={() => props.navigation.navigate('Photos')}>
                <Icon name='ios-images' />
                <Text >Photos</Text>
              </Button>
        
          <View style={{ flex: 1, flexDirection: 'row',justifyContent: 'space-between',margin:5}}>
            <ScrollView style={styles.container}>
             
              <Lightbox underlayColor="white" >
                <Image
                  style={styles.contain}
                  resizeMode="contain"
                  source={{ uri: 'https://www.rallye-sport.fr/wp-content/uploads/2017/12/Calendrier-Epreuves-Historiques-2018.jpg' }}/>
              </Lightbox>
            </ScrollView>   
          </View>
            <Button style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "red", width: "40%" }} onPress={() => props.navigation.navigate('Video')}>
                <Icon name='video' />
                <Text >Vidéo</Text>
            </Button>
            <View style={{ flex: 1, flexDirection: 'row',justifyContent: 'space-between',margin:5}}>
            <ScrollView style={styles.container}>
              <Lightbox underlayColor="white">
                <Image
                  style={styles.contain}
                  resizeMode="contain"
                  source={{ uri: 'https://www.rallye-sport.fr/wp-content/uploads/2017/12/Calendrier-Epreuves-Historiques-2018.jpg' }}/>
              </Lightbox>
            </ScrollView>   
          </View>

          </View>
        </Content>
        </ImageBackground>
      </Container>
      
  )}
  const styles = StyleSheet.create({contain: {flex: 1,height: 150,}, container: {flex: 1,}});


  