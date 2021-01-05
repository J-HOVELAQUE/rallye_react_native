import React from 'react';
import { Content, Body, Container, Text, } from 'native-base';
import { View, Image, } from 'react-native';
import { connect } from 'react-redux';

import { RallyeH1, greyDarkTa } from '../components/rallye-lib';

function NewsScreen(props) {

    return (
        <Container>
            <Content>
                <View>
                    <Image source={{ uri: props.news.image }}
                        style={{
                            height: 200, width: '100%',
                            marginBottom: 10,
                            flex: 1
                        }} />
                    <Body style={{ paddingHorizontal: 30 }}>
                        <RallyeH1 style={{
                            fontFamily: 'Roboto_700Bold',
                            fontSize: 20,
                            color: greyDarkTa
                        }}
                            text={props.news.title} />
                        <Text style={{ marginTop: 10 }}>
                            {props.news.description}
                        </Text>
                    </Body>
                </View>
            </Content>
        </Container>
    )
}

function mapStateToProps(state) {
    return {
        news: state.clickedNews
    }
}

export default connect(
    mapStateToProps,
    null
)(NewsScreen);