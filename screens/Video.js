import React, { useState, useCallback, useRef } from "react";
import { Alert,View,Text,StyleSheet } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Container, Header, Content, Footer, FooterTab, Button, Left, Body, Title, Right, Image } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { RedButtonLogin, RedButton, RallyeH1, RallyeH2, RallyeH3, greyDarkTa, whiteTa, icoWhite, blackTa, ProfilAvatar, greyLightTa } from '../components/rallye-lib';
import Icon from 'react-native-vector-icons/FontAwesome';





export default function App(props) {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (

<Container >

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

  <Content>

    <View>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={"cDRkHXMHqFo"}
        onChangeState={onStateChange}
      />
      <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
    </View>
    <View>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={"cDRkHXMHqFo"}
        onChangeState={onStateChange}
      />
      <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
    </View>
    <View>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={"cDRkHXMHqFo"}
        onChangeState={onStateChange}
      />
      <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
    </View>



    </Content>
      
      
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

