/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
let {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ListView
} = React;

import Dimensions from 'Dimensions';

import net from './lib/server';
import html2view from './lib/html2view';

const DIVICE_WIDTH = Dimensions.get('window').width;
const PAGE_SIZE = 10;

var Wise = React.createClass({
  getDefaultProps: function() {
    return {
      user: 'libertyartchen'
    };
  },
  getInitialState: function(){
    console.log('class init');
    let posts = [];
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
    return {
      posts: [],
      dataSource: ds.cloneWithRows(posts),
    };
  },
  componentDidMount: function(){
    this.loadMore();
  },
  loaded: function(data){
    console.log(JSON.stringify(data, null, 4));
    let newDS = this.state.posts.concat(data);
    this.setState({
      posts: newDS,
      dataSource: this.state.dataSource.cloneWithRows(newDS)
    });
  },
  loadMore: function(){
    net.dashboard(this.props.user, {
      limit: PAGE_SIZE,
      offset: this.state.posts.length
    }).then(this.loaded);
  },
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

      return <Image style={[style, styles.image]} source={imgSrc} />;
    }
    return;
  },
  getTextContent: function(p){

    if(!p.tags && !p.caption){
      return;
    }
    let caption = (p.format === 'html')? html2view(p.caption) : undefined;
    let tags = p.tags
      // .slice(0, 3)
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
  renderPost: function(p){
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
  renderList: function(){
    return (
      <ListView
        onEndReached={this.onEndReached}
        dataSource={this.state.dataSource}
        renderRow={this.renderPost}
      >
      </ListView>
    );
  },
  render: function(){
    return (
      <View style={styles.body}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        {this.renderList()}
      </View>
    );
  },
  onEndReached: function(){
    console.log('reach end');
    this.loadMore();
  }
});

var FONT_SIZE = 16;

var styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B1D20'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff'
  },


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

AppRegistry.registerComponent('Wise', () => Wise);
