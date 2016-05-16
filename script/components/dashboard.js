import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ListView,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';


import net from '../lib/net';

import Post from './Post';
import WiseListView from './WiseListView';

let heartBeatLoading = require('../../assets/heart-beat.gif');
const PAGE_SIZE = 5;

var Dashboard = React.createClass({
  getInitialState: function(){
    return {
      posts: [],
      initLoading: false,
      moreLoading: false
    };
  },
  componentDidMount: function(){
    // Store.addChangeListener(this.storeChangeHandler);
  },
  componentWillUnmount: function() {
    // Store.removeChangeListener(this.storeChangeHandler);
  },
  storeChangeHandler: function(){
    // let posts = Store.getDashboard();
    // this.loaded(posts);
    // console.log('store changed');
  },
  loaded: function(data){
    // 接收到的是全量的数据
    let newDS = data;
    this.setState({
      posts: newDS
    });
  },
  loadMore: function(){
    // let alreadLoadedPostsCount = Store.getLoadedPostsCount();
    // Action.fetchMoreDashboard(this.props.user, alreadLoadedPostsCount);
    let stateUpdates = {};
    if(alreadLoadedPostsCount > 0){
      stateUpdates.moreLoading = true;
    }
    else{
      stateUpdates.initLoading = true;
    }
    this.setState(stateUpdates);
  },
  renderPost: function(data){
    // let author = Store.getBlogInfo(data.blog_name);
    return <Post data={data} />;
  },
  render: function(){
    let { posts, status } = this.props;
    // let content = posts.length? this.renderList() : this.renderLoading();
    console.log(this.props);
    return (
      <View style={styles.body}>
        <WiseListView
          rowData = {posts}
          renderRow = {this.renderPost}
          status = {status}
        />
      </View>
    );
    
  },
  onEndReached: function(){
    this.loadMore();
  }
});


var styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#1B1D20'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff'
  }
});

export default connect((state) => {
  // posts, pids, status
  let ret = {
    status: state.dashboard.status,
    posts: state.dashboard.pids.map((id) => {
      return state.posts[id]
    })
  };
  console.log(ret);
  return ret;
}, (dispatch) => ({}))(Dashboard);
