/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';

import App from './components/App';
import NavBar from './components/NavBar';

let {
  AppRegistry,
  StyleSheet,

  Navigator
} = React;


var Wise = React.createClass({
  getDefaultProps: function() {
    return {
      user: 'libertyartchen'
    };
  },
  getInitialState: function(){
    return {};
  },
  onNavItemPress: function(route){
    this.refs.navigatorEle.replace(route);
  },

  render: function(){
    return (
        <Navigator style={styles.navigatorStyle}
          ref="navigatorEle"
          initialRoute={{name: 'Dashboard', index: 0}}
          renderScene={(route, navigator) =>
            <App
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

let styles = StyleSheet.create({
  navigatorStyle: {
  }
});

AppRegistry.registerComponent('Wise', () => Wise);
