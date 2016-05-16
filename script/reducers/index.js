import _ from 'lodash';
import { combineReducers } from 'redux'

/*
  posts
  blogs
  dashboard{
    status
    pids
  }
  likes{
    status
    pids
  }
*/

// post 应该用何种方式存储? id为key的对象 还是 数组?
let posts = (state = {}, action) => {
  switch (action.type){
    case 'dashboard_load':
      let newPosts = {};
      action.data.forEach((d) => {
        newPosts[d.id] = d;
      });
      return _.merge(state, newPosts);
    default:
      return state;
  }
}

let defaultDashboardState = {
  pids: [],
  status: 'load_init'
};

let dashboard = (state = defaultDashboardState, action) => {
  // console.log(state);
  switch (action.type){
    case 'dashboard_start':
      return _.merge(state, {
        status: 'load_done' 
      });
      break;
    case 'dashboard_load':
      // 长时间不刷新, 会导致offset不精确
      let newIds = action.data.map((item) => item.id);
      let oldIds = state.pids;
      let lastOldId = state.pids[state.pids.length - 1];
      let repeatedIndex = newIds.indexOf(lastOldId);
      let usableIds;
      if(repeatedIndex >= 0){
        usableIds = newIds.splice(repeatedIndex + 1);
      }
      else{
        usableIds = newIds;
      }
      return _.merge({}, state, {
        status: 'done',
        pids: usableIds
      });
    case 'refresh_done':
      let newState = Object.assign({}, state);
      newIds = action.posts.map((item) => item.id);
      newState.status = 'done';
      newState.pids = newIds.concat(newState.pids);
      return newState;
    default:
      return state;
  }
}

export default combineReducers({
  dashboard,
  posts
});
