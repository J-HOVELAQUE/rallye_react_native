import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux';


function TeamScreen(props) {

  console.log('Utilisateur connecté', props.userConnected);

  return (
    <View style={{
      flex: 1, backgroundColor: '#e67e22', alignItems: "center",
      justifyContent: "center"
    }}>
      <Text>TeamScreen</Text>
    </View>
  );
}

function mapStateToProps(state) {
  return { userConnected: state.userConnected }
}

export default connect(
  mapStateToProps,
  null
)(TeamScreen);