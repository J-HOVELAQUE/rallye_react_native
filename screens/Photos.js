import React, {useEffect,useState} from 'react';
import {SafeAreaView,StyleSheet,View,FlatList,Image,ImageBackground ,ScrollView} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title,Card,CardItem,Content,Text } from 'native-base';
import Lightbox from 'react-native-lightbox';
import { RedButtonLogin, RedButton, RallyeH1, RallyeH2, RallyeH3, greyDarkTa, whiteTa, icoWhite, blackTa, ProfilAvatar, greyLightTa } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = (props) => {
const [dataSource, setDataSource] = useState([

    
]);

  useEffect(() => {
    let items = Array.apply(null, Array(60)).map((v, i) => {
      return {
        id: i,
        src: 'http://placehold.it/200x200?text=' + (i + 1)
      };
    });
    setDataSource(items);
  }, []);
var dataImage=[ 'https://www.sportmag.fr/wp-content/uploads/2020/08/Tour-de-Corse-historique.jpeg',
                'https://www.rallye-sport.fr/wp-content/uploads/2017/12/Calendrier-Epreuves-Historiques-2018.jpg',
                'https://www.ffsa.org/VHC/PublishingImages/Pages/CoupesEtChampionnats/RallyeVH/RallyeSurRoutesOuvertes/Coupes%20et%20Championnats%20-%20VHC%20-%20Rallye%20-%20Rallyes%20de%20R%C3%A9gularit%C3%A9%20Historique.jpg',
                'https://www.rallye-sport.fr/wp-content/uploads/2016/09/Liste-engages-Tour-de-Corse-Historique-2016.jpg',
                'https://www.sportmag.fr/wp-content/uploads/2020/08/Tour-de-Corse-historique.jpeg',
                'https://www.ardeche-actu.com/wp-content/uploads/2017/02/mini-rallye-monte-carlo-historique.jpg',
                'https://www.rallye-sport.fr/wp-content/uploads/2017/12/Calendrier-Epreuves-Historiques-2018.jpg',
                'https://www.sportmag.fr/wp-content/uploads/2020/08/Tour-de-Corse-historique.jpeg',
                'https://www.rallye-sport.fr/wp-content/uploads/2017/12/Calendrier-Epreuves-Historiques-2018.jpg',
                'https://www.ffsa.org/VHC/PublishingImages/Pages/CoupesEtChampionnats/RallyeVH/RallyeSurRoutesOuvertes/Coupes%20et%20Championnats%20-%20VHC%20-%20Rallye%20-%20Rallyes%20de%20R%C3%A9gularit%C3%A9%20Historique.jpg',
                'https://www.rallye-sport.fr/wp-content/uploads/2016/09/Liste-engages-Tour-de-Corse-Historique-2016.jpg',
                'https://www.ardeche-actu.com/wp-content/uploads/2017/02/mini-rallye-monte-carlo-historique.jpg',
                'https://www.rallye-sport.fr/wp-content/uploads/2017/12/Calendrier-Epreuves-Historiques-2018.jpg',
                'https://www.ffsa.org/VHC/PublishingImages/Pages/CoupesEtChampionnats/RallyeVH/RallyeSurRoutesOuvertes/Coupes%20et%20Championnats%20-%20VHC%20-%20Rallye%20-%20Rallyes%20de%20R%C3%A9gularit%C3%A9%20Historique.jpg',
                'https://www.rallye-sport.fr/wp-content/uploads/2016/09/Liste-engages-Tour-de-Corse-Historique-2016.jpg',
                'https://www.ardeche-actu.com/wp-content/uploads/2017/02/mini-rallye-monte-carlo-historique.jpg',
                'https://www.rallye-sport.fr/wp-content/uploads/2017/12/Calendrier-Epreuves-Historiques-2018.jpg',
                'https://www.sportmag.fr/wp-content/uploads/2020/08/Tour-de-Corse-historique.jpeg',

]

var dataImage2 = dataImage.map((image,i)=>(
    
        <Lightbox underlayColor="white"  useNativeDriver={true}>
            <Image style={styles.imageThumbnail} source={ {uri: image} }key={i} />
        </Lightbox>

        ))
  return (
    <Container>
     <Header style={{ backgroundColor: greyDarkTa }}>
        <Left>
        <Button transparent onPress={() => props.navigation.navigate('Medias')}>
            <Icon name='arrow-left' size={20} style={{ color: whiteTa }} />  
          </Button>
        </Left>

        <Body>
          <Text style={{ color: whiteTa }}>VIDEO</Text>
        </Body>

        <Right>
          <Icon name='user-circle' size={25} style={{ color: icoWhite, marginRight: 10 }} onPress={() => { props.navigation.navigate('Login') }} />
        </Right>
      </Header>
    <ImageBackground source={require('../assets/fondCarbon.jpg')} style={styles.container}>

    <Content>

    <SafeAreaView style={styles.container}>
      <FlatList
        data={dataImage2}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              margin: 1
            }}>
                {item}
            
          </View>
        )}
        //Setting the number of column
        numColumns={2
        }
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
    backgroundColor: 'black',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  
});
