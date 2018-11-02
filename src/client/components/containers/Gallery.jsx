import React, { Component } from 'react';
import { connect } from 'react-redux';

import Image from './Image.jsx';
import * as actions from '../../actions/actions';
import Column from '../display/Column.jsx';
import HeadImage from '../display/HeadImage.jsx';

const mapStateToProps = store => ({
  displayedImages : store.state.displayedImages,
  imageFilterTag : store.state.imageFilterTag,
  sidebarHeight : store.state.sidebarHeight,
  headerHeight : store.state.headerHeight,
  screenWidth : store.state.screenWidth,
})
const mapDispatchToProps = dispatch => ({
});

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state={
      imageFilterTag : this.props.imageFilterTag,
      leftImages : [],
      rightImages : [],
      centerImage : [],
    }
  }

  componentDidUpdate() {
    if (this.state.imageFilterTag != this.props.imageFilterTag){

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

      this.setState({
        imageFilterTag : this.props.imageFilterTag,
        leftImages : leftImages,
        rightImages : rightImages,
        centerImage : centerImage,
      });
    }
    
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  render() {
    
    

    let marginTop = this.props.screenWidth <= 800 ? this.props.sidebarHeight + this.props.headerHeight : 0;
    const styles = {
      marginTop : marginTop +'px',
    }

    return(
      <div id='gallery' style={styles}>
        <HeadImage centerImage={this.state.centerImage}></HeadImage>
        <Column imageList={this.state.leftImages}></Column>
        <Column imageList={this.state.rightImages}></Column>
      </div>
    )
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Gallery);