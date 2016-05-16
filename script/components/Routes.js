import _ from 'lodash';
import React from 'react';

import Dashboard from './Dashboard';
import Likes from './Likes';

let coms = {
  Dashboard: (props) => {
      return <Dashboard {..._.pick(props, 'user')}/>;
  },
  Likes: (props) => {
    return <Likes {..._.pick(props, 'user')}/>;
  }
};

export default React.createClass({
  render: function(){
    return coms[this.props.name](this.props);
  }
});
