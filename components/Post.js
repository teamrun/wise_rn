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
  renderHeader: function(author){
    return (
      <View style={styles.postHeader}>
        <View style={styles.avatarCtn}>
          <Image style={styles.avatar} source={{uri: author.avatar}} />
        </View>
        <Text style={styles.blogName}>{author.name}</Text>
      </View>
    );
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
    let { data: p, author } = this.props;
    let image = this.getPhoto(p);
    let textContent = this.getTextContent(p);

    let postHeader = author? this.renderHeader(author) : undefined;

    return (
      <View key={p.id} style={styles.postCtn}>
        {postHeader}
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
    flex: 1,
    marginBottom: 20,
    width: DIVICE_WIDTH,
    backgroundColor: '#fff',
  },
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
