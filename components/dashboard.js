'use strict';

import React from 'react-native';
let {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ListView,
  TouchableWithoutFeedback
} = React;


import net from '../lib/net';
import Store from '../store';

import Post from './Post';

const PAGE_SIZE = 10;

var Dashboard = React.createClass({
  getDefaultProps: function() {
    return {
      user: 'libertyartchen'
    };
  },
  getInitialState: function(){
    let posts = [];
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
    return {
      posts: [],
      dataSource: ds.cloneWithRows(posts),
    };
  },
  componentDidMount: function(){
    // this.loadMore();
    Store.addChangeListener(this.storeChangeHandler);
  },
  componentWillUnmount: function() {
    Store.removeChangeListener(this.storeChangeHandler);
  },
  storeChangeHandler: function(){
    let posts = Store.getDashboard();
    this.loaded(posts);
  },
  loaded: function(data){
    // let newDS = this.state.posts.concat(data);
    let newDS = data;
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

  renderList: function(){
    return (
      <ListView
        initialListSize={2}
        pageSize={4}
        onEndReached={this.onEndReached}
        dataSource={this.state.dataSource}
        renderRow={(data) => <Post data={data} />}
      >
      </ListView>
    );
  },
  renderLoading: function(){
    return <Text style={styles.loadingText}>正在载入...</Text>;
  },
  render: function(){
    let { posts } = this.state;
    let content = posts.length? this.renderList() : this.renderLoading();
    return (
      <View style={styles.body}>
        {content}
      </View>
    );
  },
  onEndReached: function(){
    console.log('reach end');
    this.loadMore();
  }
});


var styles = StyleSheet.create({
  body: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#1B1D20'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff'
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'rgba(255,255,255,0.8)',
    // fontWeight: 'bold',
    marginTop: 100
  }
});

export default Dashboard;
