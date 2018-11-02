import React, { Component } from 'react';
import { connect } from 'react-redux';

import Image from './Image.jsx';
import * as actions from '../../actions/actions';
import Column from '../display/Column.jsx';
import HeadImage from '../display/HeadImage.jsx';

const mapStateToProps = store => ({
  displayedImages : store.state.displayedImages
})
const mapDispatchToProps = dispatch => ({
});

class Gallery extends Component {
  constructor(props) {
    super(props);
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  render() {
    let leftImages = [];
    let rightImages = [];
    let centerImage;

    if(this.props.displayedImages){
      this.props.displayedImages.forEach((image, index) => {
        rightImages.push(<Image imageData={image} key={index}></Image>);
        
      })
      //shuffle...
      rightImages = this.shuffle(rightImages);
      leftImages = rightImages.splice(0,rightImages.length/2);
      centerImage = rightImages.splice(0,1);
    }

    return(
      <div id='gallery' style={styles}>
        <HeadImage centerImage={centerImage}></HeadImage>
        <Column imageList={leftImages}></Column>
        <Column imageList={rightImages}></Column>
      </div>
    )
  }
}

const styles = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);