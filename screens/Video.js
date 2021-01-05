import React, { useState, useCallback } from "react";
import { View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Container, Content } from 'native-base';

import { greyDarkTa } from '../components/rallye-lib';

export default function VideoScreen() {

    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
        }
    }, []);

    return (

        <Container >

            <Content style={{ flex: 1, backgroundColor: greyDarkTa }}>
                <View >
                    <YoutubePlayer
                        height={230}
                        play={playing}
                        videoId={"oDN1ee_2HTI"}
                        onChangeState={onStateChange}
                    />
                </View>
                <View >
                    <YoutubePlayer
                        height={230}
                        play={playing}
                        videoId={"cDRkHXMHqFo"}
                        onChangeState={onStateChange}
                    />
                </View>
                <View >
                    <YoutubePlayer
                        height={230}
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