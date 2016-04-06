import Dispatcher from './dispatcher';
import Constants from './constants';

import net from '../lib/net';

const PAGE_SIZE = 5;

let actionFail = (e) => {
  console.error('error caught in action');
  console.error(e.stack || e);
};

let actions = {
  initLoad: (user) => {
    var parr = [net.followingList(user), net.dashboard(user, {limit: PAGE_SIZE})];
    Promise.all(parr).then(([blogs, posts]) => {
      // console.log(blogs);
      // console.log(posts);
      actions.initDone(blogs, posts);
    })
    .catch(actionFail);
  },
  initDone: (followings, posts) => {
    Dispatcher.dispatch({
      actionType: Constants.INIT_DONE,
      data: { followings, posts }
    });
  },
  fetchMoreDashboard: (user, alreadyCount) => {
    net.dashboard(user, {limit: PAGE_SIZE, offset: alreadyCount})
      .then(actions.moreDashboardDone)
      .catch(actionFail);
  },
  moreDashboardDone: (posts) => {
    Dispatcher.dispatch({
      actionType: Constants.MORE_DASHBOARD_DONE,
      data: { posts }
    });
  },
  likePost: (postId) => {
    Dispatcher.dispatch({
      actionType: Constants.POST_LIKE
    });
  }
};

export default actions;
