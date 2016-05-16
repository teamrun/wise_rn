/*
 * post中除图片置为的文本部分
 */

import React from 'react';
import Dimensions from 'Dimensions';

import html2view from '../../lib/html2view';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

const DIVICE_WIDTH = Dimensions.get('window').width;
const FONT_SIZE = 16;

let TextContent = React.createClass({
  render() {
    let { post } = this.props;

    if(!post.tags && !post.caption){
      return;
    }
    let caption = (post.format === 'html')? html2view(post.caption) : undefined;
    let tags = post.tags
      .map((t, index) => {
      return (
          <Text key={index} style={styles.tagText}>{`#${t}`}</Text>
      );
    });
    return (
      <View style={styles.textContent}>
        {caption}
        <View style={styles.tagList}>{tags}</View>
      </View>
    );
  },
});

let styles = StyleSheet.create({
  textContent: {
    padding: 10
  },
  tagList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // wrap要起作用 就必须有width!!! maxWidth都不行
    width: DIVICE_WIDTH - 10*2,
    marginTop: FONT_SIZE * 0.75
    // justifyContent: 'space-between'
  },
  tagText: {
    marginRight: 7,
    lineHeight: 12*1.5,
    fontStyle: 'italic',
    color: '#999',
    fontSize: 12
  }
});


export default TextContent;
