import React from 'react-native';
import { EventEmiter } from 'events';

import Dashboard from './dashboard';
import Likes from './likes';

let coms = {
  Dashboard: (props) => {
      return <Dashboard {...props}/>;
  },
  Likes: (props) => {
    return <Likes {...props}/>;
  }
};

export default React.createClass({
  render: function(){
    // console.log(this.props.name);
    // console.log(coms[this.props.name]);
    console.log(this.props);
    return coms[this.props.name](this.props);
  }
});
