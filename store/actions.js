import Dispatcher from './dispatcher';
import Constants from './constants';

import net from '../lib/net';

let actions = {
  initLoad: (user) => {
    var parr = [net.followingList(user), net.dashboard(user)];
    Promise.all(parr).then(([blogs, posts]) => {
      // console.log(blogs);
      // console.log(posts);
      actions.initDone(blogs, posts);
    })
    .catch((e) => {
      console.log(e);
    });
  },
  initDone: (followings, posts) => {
    Dispatcher.dispatch({
      actionType: Constants.INIT_DONE,
      data: { followings, posts }
    });
  },
  likePost: (postId) => {
    Dispatcher.dispatch({
      actionType: Constants.POST_LIKE
    });
  }
};

export default actions;
