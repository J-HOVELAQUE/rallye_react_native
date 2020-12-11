import React, {useEffect,useState} from 'react';
import {SafeAreaView,StyleSheet,View,FlatList,Image,ImageBackground ,ScrollView} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Card,CardItem,Content } from 'native-base';

const App = () => {
const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    let items = Array.apply(null, Array(60)).map((v, i) => {
      return {
        id: i,
        src: 'http://placehold.it/200x200?text=' + (i + 1)
      };
    });
    setDataSource(items);
  }, []);

  return (
    <Container>
    <Header style={{ backgroundColor: '#313131'}}>
      <Left>
        <Button transparent>
          <Icon name='ios-people' />
        </Button>
      </Left>
      <Body>
        <Title>Programme</Title>
      </Body>
      <Right>
        <Button transparent onPress={() => props.navigation.openDrawer()}>
          <Icon name='menu' />
        </Button>
      </Right>
    </Header>
    <ImageBackground source={require('../assets/fondCarbon.jpg')} style={styles.container}>

    <Content>

    <SafeAreaView style={styles.container}>
      <FlatList
        data={dataSource}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              margin: 1
            }}>
            <Image
              style={styles.imageThumbnail}
              source={{uri: 'https://www.yayomg.com/wp-content/uploads/2014/04/yayomg-pig-wearing-party-hat.jpg'}}
            />
          </View>
        )}
        //Setting the number of column
        numColumns={3}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>

    </Content>
        </ImageBackground>
      </Container>

  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});