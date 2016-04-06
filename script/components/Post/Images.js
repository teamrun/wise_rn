/*
 * post的图片内容
 */

import React from 'react-native';
import Dimensions from 'Dimensions';


const DIVICE_WIDTH = Dimensions.get('window').width;

let {
  StyleSheet,
  View,
  Image,
  Text,

  TouchableWithoutFeedback
} = React;

let Images = React.createClass({
  getPhoto(photoItem) {
      let sizeP = photoItem.original_size;

      let width = parseInt(DIVICE_WIDTH/1);
      let height = sizeP.height * (width / sizeP.width);
      let style = {
        width,
        height
      };
      var imgSrc = {uri: sizeP.url};

      return <Image
        style={[style, styles.image]}
        source={imgSrc}
      />;
  },
  renderPhoto(photoItem, index) {
    let img = this.getPhoto(photoItem);
    return (
      <TouchableWithoutFeedback
        onPress={this.showPhotoInModal}
        key={index}
      >
        {img}
      </TouchableWithoutFeedback>
    );
  },
  render() {
    let { photos } = this.props;
    if(photos && photos.length){
      return (
        <View>
          { photos.map(this.renderPhoto) }
        </View>
      );
    }
    return <View><Text>no image</Text></View>;
  },
  showPhotoInModal(e) {
    // console.log(this.props.);
  },
});

let styles = StyleSheet.create({
  image: {}
});


export default Images;
