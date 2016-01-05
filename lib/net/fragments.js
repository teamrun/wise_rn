import format from 'string-format';

const ImageFields = `{
  url
  width
  height
}`;

const BlogInfoFields = `{
  name,
  title,
  description,
  url,
  avatar
}`;

let fragment_dashboard = `{
  dashboard({}){
    id
    blog_name
    post_url
    type
    timestamp
    date
    format
    reblog_key
    tags
    state
    title
    body
    photos{
      caption
      thumbnail ${ImageFields}
      original_size ${ImageFields}
    }
    caption
  }
}`;

let fragment_following_count = `{
  following({}){
    total_blogs
  }
}`;

let fragment_following_list = `{
  following({}){
    blogs ${BlogInfoFields}
  }
}`;

let objToGraphQLParam = (obj) => {
  let arr = [];
  for(var i in obj){
    let str = i;
    str += ': ';
    str += (typeof obj[i] === 'number')? obj[i] : `"${obj[i]}"`;
    arr.push(str);
  }
  return arr.join(', ');
};

export default {
  dashboard: (param) => {
    let query = format(fragment_dashboard, objToGraphQLParam(param));
    return query;
  },
  followingCount: (param) => {
    let query = format(fragment_following_count, objToGraphQLParam(param));
    return query;
  },
  followingList: (param) => {
    let query = format(fragment_following_list, objToGraphQLParam(param));
    return query;
  }
};
