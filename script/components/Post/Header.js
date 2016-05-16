/*
 * post的头部
 */

import React from 'react';
import Dimensions from 'Dimensions';

import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
const DIVICE_WIDTH = Dimensions.get('window').width;

let PostHeader = React.createClass({
  render() {
    let { author } = this.props;
    if(!author) return;
    return (
      <View style={styles.postHeader}>
        <View style={styles.avatarCtn}>
          <Image style={styles.avatar} source={{uri: author.avatar}} />
        </View>
        <Text style={styles.blogName}>{author.name}</Text>
      </View>
    );
  },
});

let styles = StyleSheet.create({
  postHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: DIVICE_WIDTH,
    height: 50,
    padding: 5
  },
  avatarCtn: {
    width: 40,
    height: 40,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.25,
    shadowRadius: 3
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 5
  },
  blogName: {
    position: 'relative',
    marginLeft: 10,
    marginTop: -5
  }
});


export default PostHeader;
