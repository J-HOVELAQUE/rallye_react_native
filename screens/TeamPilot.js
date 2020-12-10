import React from 'react';
import { Header, Content, Button, Icon, Card, CardItem, Text, Right, Left, Body ,Title, Container} from 'native-base';
import { View, StyleSheet, ImageBackground,Image } from 'react-native';


export default function Team(props) {

  return (
    
<Container>
<Header style={{ backgroundColor: '#313131'}}>
          <Left>
            <Button transparent>
            <Icon name='arrow-back' style={{ color: 'white' }}  onPress={() => props.navigation.navigate('Teams')}/>
            </Button>
          </Left>
          <Body>
            <Title>Les Equipes</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        
      <Content>

        <Card style={{width:350,flex:1}}>
        <CardItem > 
            
              <Text>#001</Text>
             
            </CardItem>
            <CardItem>
                <Image source={require('../assets/206.jpg')} style={{height: 200, width: null, flex: 1}}/>
            </CardItem> 
            <CardItem>
            <Body>
              <Text>
                <Image source={require('../assets/flag-french.png')} style={{height: 10, width: 10, flex: 1}}/>
                  Pilote 1</Text>
              <Text></Text>
              <Text>
                <Image source={require('../assets/flag-french.png')} style={{height: 10, width: 10, flex: 1}}/>
                  Pilote 2</Text>
            </Body>
            </CardItem>
            <CardItem>
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ullamcorper lectus turpis, et lacinia arisi, in congue metus tincidunt vel. Fusce ullamcorper ligula mi. Praesent placerat, nibh non posuere eleifende maximus nunc at interdt sodales purus.</Text>
          </CardItem>
            <CardItem>
            <Left>
                <Icon name="heart" />
            </Left>
              
            <Right>
            <Icon name="locate" onPress={() => props.navigation.navigate('Map')}/>
            </Right>
          </CardItem>
        </Card>


      </Content>
      
      </Container>
    
  );
}


