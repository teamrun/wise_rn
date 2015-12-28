import React from 'react-native';

let {
  StyleSheet,
  View,
  Text,
  Image
} = React;

// import htmlparser from 'htmlparser2';
//
// var parser = new htmlparser.Parser({
// 	onopentag: function(name, attribs){

// "<p>Couldn&rsquo;t wish for better offspring. #the_lulu @the_lulu_cph by copenhagenizer <a href="http://ift.tt/1TOb90J">http://ift.tt/1TOb90J</a></p>"
let tags = ['<p>', '<a'];

let textStyle = StyleSheet.create({
  p: {
    color: '#555',
    lineHeight: 14 * 1.35
  },
  a: {
    textDecorationLine: 'underline',
    color: '#00CEC6'
  }
});

// let eleCreator = {
//
// };

const TAG_START_REG = /\<[pa]/;

function convert(htmlStr){

  return (
    <Text style={textStyle.p}>
      {htmlStr}
    </Text>
  );
}

export default convert;
