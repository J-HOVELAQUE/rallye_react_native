import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Container, Content } from 'native-base';

import { greyDarkTa, whiteTa } from '../components/rallye-lib';
import HeaderRally from '../components/HeaderRally';

function MediaScreen(props) {
    return (
        <Container style={{ backgroundColor: greyDarkTa }}>
            <HeaderRally openBurgerMenu={props.navigation.openDrawer}
                nav={props.navigation.navigate}
                titleHeader="MEDIA" />

            <Content >
                <View style={{ justifyContent: 'center', flex: 1 }}>

                    <Text style={{
                        fontFamily: 'Roboto_700Bold',
                        fontSize: 20,
                        color: whiteTa,
                        textAlign: 'center',
                        paddingVertical: 10
                    }}>
                        Photos
                    </Text>

                    <View >
                        <TouchableOpacity onPress={() => props.navigation.navigate('Photos')}>
                            <Image source={{ uri: 'https://peterauto.peter.fr/wp-content/gallery/tour-auto-2020/SBE_1009.jpg' }}
                                style={{ height: 230 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginVertical: 5, }} />

                    <View>
                        <Text style={{
                            fontFamily: 'Roboto_700Bold',
                            fontSize: 20,
                            color: whiteTa,
                            textAlign: 'center',
                            paddingVertical: 10
                        }}>
                            Videos
                        </Text>

                        <TouchableOpacity onPress={() => props.navigation.navigate('Video')}>
                            <Image source={{ uri: 'https://res.cloudinary.com/dibl3ihpy/image/upload/v1608228088/tao-video_cdvcyv.png' }}
                                style={{ height: 210, width: '100%', flex: 1 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Content>
        </Container>
    )
}

export default MediaScreen