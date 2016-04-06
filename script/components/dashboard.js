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
import Action from '../store/actions';

import Post from './Post';
import WistLitView from './WiseListView';

let heartBeatLoading = require('../../assets/heart-beat.gif');
const PAGE_SIZE = 5;

var Dashboard = React.createClass({
  getInitialState: function(){
    Action.initLoad(this.props.user);

    return {
      posts: [],
      initLoading: false,
      moreLoading: false
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
    let alreadLoadedPostsCount = Store.getLoadedPostsCount();
    Action.fetchMoreDashboard(this.props.user, alreadLoadedPostsCount);
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
    let author = Store.getBlogInfo(data.blog_name);
    return <Post data={data} author={author} />;
  },
  render: function(){
    let { posts, initLoading, moreLoading } = this.state;
    // let content = posts.length? this.renderList() : this.renderLoading();
    return (
      <View style={styles.body}>
        <WistLitView
          rowData = {posts}
          renderRow = {this.renderPost}
          loading = {initLoading}
          moreLoading = {moreLoading}
          endReachHandler = {this.loadMore}
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
    // justifyContent: 'center',
    // alignItems: 'center',
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
