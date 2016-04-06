import _ from 'lodash';
import { EventEmitter } from 'events';

import Dispatcher from './dispatcher';
import Constants from './constants';

let store = {
  // tumblr开放出来的接口, 只能通过offset翻页
  // 会出现 有新的post 客户端不知道, 翻页offset不准确的问题
  // 下拉刷新时重置这个值
  newlyPostsCount: 0,
  dashboard: []
};
var CHANGE_EVENT = 'change';


Dispatcher.register((action) => {
  let {actionType, data} = action;
  switch(actionType){
    case Constants.INIT_DONE:
      store.blogs = data.followings;
      store.dashboard = data.posts;
      appStore.emitChange();
      break;
    case Constants.MORE_DASHBOARD_DONE:
      let { posts } = data;
      let repeatIndex = _.findIndex(store.dashboard, (p) => {
        return p.id === data.posts[0].id;
      });
      if(repeatIndex >= 0 && repeatIndex < store.dashboard.length - 1){
        let repeatedCount = store.dashboard.length - 1 - repeatIndex;
        posts = posts.slice(repeatedCount);
        store.newlyPostsCount += repeatedCount;
      }
      store.dashboard = store.dashboard.concat(posts);
      appStore.emitChange();
      break;
  }
});

let appStore = Object.assign({}, EventEmitter.prototype, {
  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(fn){
    this.on(CHANGE_EVENT, fn);
  },
  removeChangeListener: function(fn){
    this.removeListener(CHANGE_EVENT, fn);
  },
  getBlogInfo: (name) => {
    let blog;
    store.blogs.some((b) => {
      blog = b;
      return b.name === name;
    });
    return blog;
  },
  getDashboard: () => {
    return store.dashboard;
  },
  getLoadedPostsCount: () => {
    // 后面还要加上周期获取的最新的posts的个数
    // 以避免重复
    return store.dashboard.length + store.newlyPostsCount;
  }
});

export default appStore;
