import React from 'react-native';
import _ from 'lodash';

import htmlParser from '../vendor/htmlparser';

let {
  StyleSheet,
  View,
  Text,
  Image
} = React;


let styles = StyleSheet.create({
  p: {
    color: '#555',
    lineHeight: 14 * 1.35
  },
  a: {
    textDecorationLine: 'underline',
    color: '#2F83A3'
  }
});


function convert(htmlStr){
  let children = [];
  let tagStart;
  let txt = '';
  let index = 0;
  htmlParser(htmlStr, {
    start: (tag, attr) => {
      if(tagStart && tagStart !== tag){
        console.log('start push', tagStart);
        children.push(<Text style={styles[tagStart]} key={index++}>{_.unescape(txt)}</Text>);
        txt = '';
        tagStart = undefined;
      }
      tagStart = tag;
    },
    end: (tag) => {
      if(tagStart === tag){
        console.log('end push', tag);
        children.push(<Text style={styles[tag]} key={index++}>{_.unescape(txt)}</Text>);
        txt = '';
      }
    },
    chars: (c) => {
      txt += c;
    }
  });

  return (
    <Text style={styles.p}>
      {children}
    </Text>
  );
}

export default convert;
