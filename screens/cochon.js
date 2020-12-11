import React from 'react';
import {Image,ScrollView,StyleSheet,} from 'react-native';
import Lightbox from 'react-native-lightbox';

export default () => (
  <ScrollView style={styles.container}>
     <Lightbox underlayColor="white">
      <Image
        style={styles.contain}
        resizeMode="contain"
        source={{ uri: 'https://www.yayomg.com/wp-content/uploads/2014/04/yayomg-pig-wearing-party-hat.jpg' }}/>
    </Lightbox>
    </ScrollView>
)

const styles = StyleSheet.create({contain: {flex: 1,height: 150,}});
