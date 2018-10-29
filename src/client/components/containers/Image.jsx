import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch => ({
  setBlowUpImage : (imageData) => {
    dispatch(actions.setBlowUpImage(imageData));
  },
});

class Image extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let src = __dirname + 'assets/thumbnails/' + this.props.imageData.name;

    return(
      <img className='image' src={src} style={styles} onClick={()=>this.props.setBlowUpImage(this.props.imageData)}>
      </img>
    )
  }
}

const styles = {
    width : '100%',
    alignSelf : 'center',
    flex: '0 0 auto',
    padding : '5px',
    boxSizing : 'border-box',
    cursor : 'pointer'
}

export default connect(mapStateToProps, mapDispatchToProps)(Image);