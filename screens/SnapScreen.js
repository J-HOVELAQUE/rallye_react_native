import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Button } from 'react-native';
import { Overlay } from 'react-native-elements';
// import { Button } from '../components/rallye-lib';


import { Camera } from 'expo-camera';

import { withNavigationFocus } from 'react-navigation';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonic from 'react-native-vector-icons/Ionicons';

// import { Button, Overlay } from 'react-native-elements';

import { connect } from 'react-redux';
import { Container, Header, Left, Body, Right, Text } from 'native-base';


// const serverUrl = 'https://powerful-earth-91256.herokuapp.com';
const serverUrl = 'http://192.168.1.26:3000';

function SnapScreen(props) {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.torch);

    const [recordingVideo, setRecordingVideo] = useState(false);

    var camera = useRef(null);

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    var cameraDisplay;
    if (hasPermission && props.isFocused) {
        cameraDisplay = <Camera
            style={{ flex: 1 }}
            type={type}
            flashMode={flash}
            ref={ref => (camera = ref)}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                }}>
                <TouchableOpacity
                    style={{

                        alignSelf: 'flex-end',
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}
                >
                    <IconIonic
                        name="md-reverse-camera"
                        size={20}
                        color="#ffffff"
                    /><Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{

                        alignSelf: 'flex-end',
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        setFlash(
                            flash === Camera.Constants.FlashMode.torch
                                ? Camera.Constants.FlashMode.off
                                : Camera.Constants.FlashMode.torch
                        );
                    }}
                >
                    <IconFontAwesome
                        name="flash"
                        size={20}
                        color="#ffffff"
                    /><Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flash </Text>
                </TouchableOpacity>

            </View>
        </Camera>
    } else {
        cameraDisplay = <View style={{ flex: 1 }}></View>
    }

    return (
        <Container>

            <Header>
                <Button title="Retour"
                    onPress={() => props.navigation.navigate('Mon compte')} />
            </Header>

            <Overlay isVisible={visible} width="auto" height="auto">
                <Text>Loading</Text>
            </Overlay>

            { cameraDisplay}
            <Button
                icon={
                    <IconFontAwesome
                        name="save"
                        size={20}
                        color="#ffffff"
                    />
                }
                title="Snap"
                buttonStyle={{ backgroundColor: "#009788" }}
                type="solid"
                onPress={async () => {
                    setVisible(true);
                    if (camera) {
                        let photo = await camera.takePictureAsync({ quality: 0.2 });

                        let data = new FormData();
                        data.append('photo', {
                            uri: photo.uri,
                            type: 'image/jpeg',
                            name: 'photo'
                        });

                        const rawAnswer = await fetch(serverUrl + "/user/change-avatar", {
                            method: 'post',
                            body: data
                        });
                        const answer = await rawAnswer.json();
                        console.log(answer);
                        props.addPhotoToGalery({
                            url: answer.info.url,
                            gender: answer.gender,
                            age: answer.age,
                            glasses: answer.glasses,
                            smile: answer.smile
                        })

                        if (answer.result) {
                            setVisible(false);
                        }
                    }
                }}
            />
        </Container >
    );
}


function mapDispatchToProps(dispatch) {
    return {
        addPhotoToGalery: function (url) {
            dispatch({
                type: 'addPhoto',
                url: url
            })
        }
    }
}

const SnapAndRedux = connect(
    null,
    mapDispatchToProps
)(SnapScreen);

export default withNavigationFocus(SnapAndRedux);