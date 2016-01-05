import Dispatcher from './dispatcher';
import { EventEmitter } from 'events';

import Constants from './constants';

let store = {};
var CHANGE_EVENT = 'change';


Dispatcher.register((action) => {
  let {actionType, data} = action;
  switch(actionType){
    case Constants.INIT_DONE:
      store.blogs = data.followings;
      store.dashboard = data.posts;
      appStore.emitChange();
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
    for(let i in store.blogs){
      if(store.blogs[i].name === i){
        return store.blogs[i];
      }
    }
    return null;
  },
  getDashboard: () => {
    return store.dashboard;
  }
});

export default appStore;
