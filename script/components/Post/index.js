import React from 'react';
import Dimensions from 'Dimensions';


import PostHeader from './Header';
import Images from './Images';
import TextContent from './TextContent';


import {
  StyleSheet,
  View,

  TouchableWithoutFeedback
} from 'react-native';

const DIVICE_WIDTH = Dimensions.get('window').width;

let Post = React.createClass({
  render: function(){
    let { data: p, author } = this.props;

    // let postHeader =  <PostHeader author = {author} />;
    let image =       <Images photos = {p.photos} />;
    let textContent = <TextContent post = {p} />;

    return (
      <View key={p.id} style={styles.postCtn}>
        {image}
        {textContent}
      </View>
    );
  }
});


let styles = StyleSheet.create({
  postCtn:{
    flex: 1,
    marginBottom: 20,
    width: DIVICE_WIDTH,
    backgroundColor: '#fff',
  }
});

export default Post;
