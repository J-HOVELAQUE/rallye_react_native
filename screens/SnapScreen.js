import React, { useState, useEffect, useRef } from 'react';
import { View, Button } from 'react-native';
import { Container, Text } from 'native-base';
import { Overlay } from 'react-native-elements';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { Camera } from 'expo-camera';

const serverUrl = 'https://powerful-earth-91256.herokuapp.com';

function SnapScreen(props) {

    const [hasPermission, setHasPermission] = useState(null);
    const [visible, setVisible] = useState(false);

    let camera = useRef(null);

    useEffect(() => {
        (async () => {
            //// Ask permission for using the camera ////
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    let cameraDisplay;
    if (hasPermission && props.isFocused) {
        cameraDisplay = <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.front}
            flashMode={Camera.Constants.FlashMode.off}
            ref={ref => (camera = ref)}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                }}>
            </View>
        </Camera>
    } else {
        cameraDisplay = <View style={{ flex: 1 }}></View>
    }

    return (
        <Container>

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

                        ///// Take photo  /////
                        let photo = await camera.takePictureAsync({ quality: 0.2 });

                        ///// Send photo and token to backend /////
                        let data = new FormData();
                        data.append('avatar', {
                            uri: photo.uri,
                            type: 'image/jpeg',
                            name: 'user_avatar.jpg',
                        });

                        const rawAnswer = await fetch(`${serverUrl}/user/change-avatar?token=${props.userConnected.token}`, {
                            method: 'post',
                            body: data
                        });
                        const answer = await rawAnswer.json();

                        ///// Recording new avatar in redux /////
                        props.changeAvatarUrl(answer.avatar_url);

                        if (answer.result) {
                            setVisible(false);
                        }
                    }
                }}
            />
        </Container >
    );
}

function mapStateToProps(state) {
    return {
        userConnected: state.userConnected
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeAvatarUrl: function (url) {
            dispatch({
                type: 'changeAvatar',
                url: url
            })
        }
    }
}

const SnapAndRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(SnapScreen);

export default withNavigationFocus(SnapAndRedux);