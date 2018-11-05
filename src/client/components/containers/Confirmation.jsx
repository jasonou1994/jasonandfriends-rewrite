import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/actions';

const mapStateToProps = store => ({
  isDisplayedConfirmation : store.state.isDisplayedConfirmation,
})
const mapDispatchToProps = dispatch => ({
  hideConfirmation : () => {
    dispatch(actions.hideConfirmation());
  }
});

class Confirmation extends Component {
  constructor(props) {
    super(props);
  }
  
  resetCart = () => {
    fetch ('/utils/cart', {
      method : 'PUT',
    })
    .then(() => this.props.hideConfirmation())
    .catch(err => console.warn(err));
  }

  render() {

    const styles = {
      display : this.props.isDisplayedConfirmation ? 'flex' : 'none',
    }

    return(
      <div id='confirmation' style={styles}>
        <h3>Thank you for placing an order!</h3>
        <div style={{marginBottom: '10px'}}>If you have questions about your order, please contact me at &nbsp;
          <a href='mailto:jason@jasonandfriends.net'>
            jason@jasonandfriends.net
          </a>
        </div>
        <div style={{marginBottom :'10px'}} onClick={this.resetCart} className='checkOutButtonBlue'>Go back to homepage</div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);