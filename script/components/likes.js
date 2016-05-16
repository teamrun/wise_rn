import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

let Likes = React.createClass({
  render: function(){
    return (
      <View style={styles.demo}>
        <Text style={styles.text}>here is Likes</Text>
      </View>
    );
  }
});

let styles = StyleSheet.create({
  demo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 50,
    fontFamily: 'Avenir Next'
  }
});

export default Likes;
