import React, { useState, useCallback } from "react";
import { Alert, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Container, Content } from 'native-base';


export default function VideoScreen() {

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  return (

    <Container >

      <Content style={{ flex: 1, backgroundColor: '#263238' }}>
        <View >
          <YoutubePlayer
            height={300}
            play={playing}
            videoId={"cDRkHXMHqFo"}
            onChangeState={onStateChange}
          />
        </View>
        <View >
          <YoutubePlayer
            height={300}
            play={playing}
            videoId={"tBGzCdG3fhQ"}
            onChangeState={onStateChange}
          />
        </View>
        <View>
          <YoutubePlayer
            height={300}
            play={playing}
            videoId={"6-bpeREC4RA"}
            onChangeState={onStateChange}
          />
        </View>
      </Content>

    </Container>
  );
}