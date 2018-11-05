import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

const mapStateToProps = store => ({
  isDisplayedBlowUp : store.state.isDisplayedBlowUp,
  isDisplayedCart : store.state.isDisplayedCart,
  isDisplayedConfirmation : store.state.isDisplayedConfirmation,
});

const mapDispatchToProps = dispatch => ({
  hideCart : () => {
    dispatch(actions.hideCart());
  },
  hideBlowUpImage : () => {
    dispatch(actions.hideBlowUpImage());
  }
});

class GreyScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let display = (this.props.isDisplayedBlowUp === 'block' || this.props.isDisplayedCart === 'block' || this.props.isDisplayedConfirmation) ? 'block' : 'none';
    const styles = {
      'display' : display,
    }

    return(
      <div id='greyScreen' style={styles} onClick={()=> {this.props.hideCart(); this.props.hideBlowUpImage();}}></div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GreyScreen);