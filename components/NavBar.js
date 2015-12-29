import React from 'react-native';
import Dimensions from 'Dimensions';

let {
  StyleSheet,
  Image,
  View,

  TouchableHighlight
} = React;

const DIVICE_WIDTH = Dimensions.get('window').width;
const navBarBGC = '#104F67';

const NAV_OPTS = [
  {
    name: 'Dashboard',
    index: 0,
    // 引用本地图片 直接require!!
    img: require('../assets/home_white.png')
  },
  {
    name: 'Likes',
    index: 0,
    img: require('../assets/heart_white.png')
  },
];

let NavBar = React.createClass({
  genPressHandler: function(n){
    return () => {
      this.props.pressHandler(n);
    };
  },
  render: function(){
    let navItems = NAV_OPTS.map((n) => {
      return (
        <TouchableHighlight key={n.name}
          onPress={this.genPressHandler(n)}
          underlayColor={navBarBGC}
        >
          <Image
            style={styles.navItem}
            source={n.img}
          />
        </TouchableHighlight>
      );
    });
    return (
      <View style={styles.navBar}>
        {navItems}
      </View>
    );
  }
});


let styles = StyleSheet.create({
  // 不能声明flex 否则会高度会变很大
  // 但是flex的属性反而可以用...
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 40,
    width: DIVICE_WIDTH,
    backgroundColor: navBarBGC
  },
  navItem: {
    width: 30,
    height: 30,
    // opacity: 0.5
    // backgroundColor: '#fff'
  }
});

export default NavBar;
