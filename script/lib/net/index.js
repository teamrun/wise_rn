import Frag from './fragments';
import demoData from '../demoData';

let graphqlAPI = 'http://chenllos.com:9016/graphql';
// let graphqlAPI = 'http://113.10.139.89:9016/graphql';

let makeGraphqlCall = (query) => {
  let body = new FormData(), method = 'POST';
  body.append('query', query);
  // console.log(query);
  return fetch(graphqlAPI, { method, body })
    .then((resp) => resp.json())
    .then((data) => {
      // console.log(data);
      return data;
    });
};

/*
 * pageOpt: Number: limit, skip
 *          String: sinceId
 */
export default {
  dashboard: (user, pageOpt) => {
    let param = Object.assign({}, pageOpt, {user});

    return makeGraphqlCall(Frag.dashboard(param))
      .then((d) => {
        if(d.errors){
          console.error(d);
          return [];
        }
        return d.data.dashboard;
      });
  },
  followingCount: (user) => {
    return makeGraphqlCall(Frag.followingCount({user}))
      .then((d) => d.data.following.total_blogs);
  },
  followingList: (user, pageOpt) => {
    return makeGraphqlCall(Frag.followingList({user}))
      .then((d) => {
        return d.data.following.blogs;
      });
  }
};
