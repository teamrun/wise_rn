/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Routes from '../components/Routes';
import NavBar from '../components/NavBar';

import * as clientActions from '../actions';

import {
  StyleSheet,

  Navigator,
  View, Text
} from 'react-native';


var WiseClient = React.createClass({
  getDefaultProps: function() {
    return {
      user: 'libertyartchen'
    };
  },
  getInitialState: function(){
    return {};
  },
  componentDidMount: function() {
    this.props.getDashboard(this.props.user, {
      offset: 0,
      limit: 10
    });
  },
  onNavItemPress: function(route){
    this.refs.navigatorEle.replace(route);
  },

  render: function(){
    return (
      <Navigator
        ref="navigatorEle"
        initialRoute={{name: 'Dashboard', index: 0}}
        renderScene={(route, navigator) =>
          <Routes
            {...this.props}
            name={route.name}
            onForward={() => {
              var nextIndex = route.index + 1;
              navigator.push({
                name: 'Scene ' + nextIndex,
                index: nextIndex,
              });
            }}
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />
        }

        navigationBar={<NavBar pressHandler={this.onNavItemPress} />}
      >
      </Navigator>
    );
  }
});
// export default connect(WiseClient, {
  
// });

export default connect((state) => {
    return {state: state}
  },
  (dispatch) => {
    return bindActionCreators(clientActions, dispatch);
  }
)(WiseClient);

// let TumblrApp = React.createClass({
//   render: function(){
//     return (
//       <View>
//         <Text>It works</Text>
//       </View>
//     );
//   }
// })

// export default TumblrApp;
