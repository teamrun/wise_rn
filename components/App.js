import React from 'react-native';
import { EventEmiter } from 'events';

import Dashboard from './dashboard';
import Likes from './likes';

let coms = {
  Dashboard: () => {
      return <Dashboard {...this.props}/>;
  },
  Likes: () => {
    return <Likes {...this.props}/>;
  }
};

export default React.createClass({
  render: function(){
    // console.log(this.props.name);
    // console.log(coms[this.props.name]);
    return coms[this.props.name]();
  }
});
