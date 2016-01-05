import React from 'react-native';
import Dimensions from 'Dimensions';

import html2view from '../lib/html2view';

let {
  StyleSheet,

  View,
  Text,
  Image,

  TouchableWithoutFeedback
} = React;

const DIVICE_WIDTH = Dimensions.get('window').width;
var FONT_SIZE = 16;

let Post = React.createClass({
  getPhoto: function(p){
    if(p.photos && p.photos.length){
      let photo = p.photos[0];
      let sizeP = photo.original_size;

      let width = DIVICE_WIDTH;
      let height = sizeP.height * (width / sizeP.width);
      let style = {
        width,
        height
      };
      var imgSrc = {uri: sizeP.url};

      return <Image
        style={[style, styles.image]}
        source={imgSrc}
      />;
    }
    return;
  },
  renderPhoto: function(p){
    let img = this.getPhoto(p);
    if(img){
      return (
        <TouchableWithoutFeedback onPress={this.showPhotoInModal}>
          {img}
        </TouchableWithoutFeedback>
      );
    }
    return;
  },
  getTextContent: function(p){

    if(!p.tags && !p.caption){
      return;
    }
    let caption = (p.format === 'html')? html2view(p.caption) : undefined;
    let tags = p.tags
      .map((t, index) => {
      return (
          <Text key={index} style={styles.tagText}>{`#${t}`}</Text>
      );
    });
    return (
      <View style={styles.textContent}>
        {caption}
        <View style={styles.tagList}>{tags}</View>
      </View>
    );
  },
  render: function(){
    let p = this.props.data;
    let image = this.getPhoto(p);
    let textContent = this.getTextContent(p);

    return (
      <View key={p.id} style={styles.postCtn}>
        <Text style={styles.blogName}>{p.blog_name}</Text>
        {image}
        {textContent}
      </View>
    );
  },

  showPhotoInModal: function(e){
    // console.log(this.props.);
  },
  handleLoadStart: function(e){
    let url = this.props.data.photos[0].original_size.url.replace('http://chenllos.com:9016/fileproxy?url=', '');
    console.log('start: ' + url);
  },
  handleLoadEnd: function(){
    let url = this.props.data.photos[0].original_size.url.replace('http://chenllos.com:9016/fileproxy?url=', '');
    console.log('done: ' + url);
  }
});


let styles = StyleSheet.create({
  postCtn:{
    position: 'relative',
    marginBottom: 20,
    maxWidth: DIVICE_WIDTH,
    backgroundColor: '#fff',
  },
  blogName: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: '#333',
    marginLeft: 10
  },
  image: {
    position: 'relative'
  },
  textContent: {
    padding: 10
  },
  tagList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // wrap要起作用 就必须有width!!! maxWidth都不行
    width: DIVICE_WIDTH - 10*2,
    marginTop: FONT_SIZE * 0.75
    // justifyContent: 'space-between'
  },
  tagText: {
    marginRight: 7,
    lineHeight: 12*1.5,
    fontStyle: 'italic',
    color: '#999',
    fontSize: 12
  }
});

export default Post;
