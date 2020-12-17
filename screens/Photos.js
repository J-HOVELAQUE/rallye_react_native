import React from 'react';
import { SafeAreaView, StyleSheet, View, FlatList, Image } from 'react-native';
import { Container, Content } from 'native-base';
import Lightbox from 'react-native-lightbox';

import { dataImage } from '../tools/toolkit';

const PhotoScreen = () => {

  const dataImage2 = dataImage.map((image, i) => (
    <Lightbox underlayColor="white" useNativeDriver={true}>
      <Image style={styles.imageThumbnail} source={{ uri: image }} key={i} />
    </Lightbox>
  ))

  return (
    <Container>

        <Content>
          <SafeAreaView style={styles.container}>
            <FlatList
              data={dataImage2}
              renderItem={({ item }) => (
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

    </Container>

  );
};
export default PhotoScreen;

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