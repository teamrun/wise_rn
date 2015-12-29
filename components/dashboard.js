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


import net from '../lib/server';

import Post from './Post';

const PAGE_SIZE = 10;

var Dashboard = React.createClass({
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
    // console.log(JSON.stringify(data, null, 4));
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
  render: function(){
    return (
      <View style={styles.body}>
        {this.renderList()}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B1D20'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff'
  }
});

export default Dashboard;
