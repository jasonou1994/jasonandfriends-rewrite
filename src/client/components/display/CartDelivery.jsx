import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/actions';

const mapStateToProps = store => ({
})
const mapDispatchToProps = dispatch => ({
});

class CartDelivery extends Component {
  constructor(props) {
    super(props);
  }

  setName = (e) => {
    this.props.updateStateAddress({
        name : e.target.value,
    });
  }
  setEmail = (e) => {
    this.props.updateStateAddress({
        email : e.target.value,
    });
  }
  setPhone = (e) => {
    this.props.updateStateAddress({
        phone : e.target.value,
    });
  }
  setAddOne = (e) => {
    this.props.updateStateAddress({
        addOne : e.target.value,
    });
  }
  setAddTwo = (e) => {
    this.props.updateStateAddress({
        addTwo : e.target.value,
    });
  }
  setCity = (e) => {
    this.props.updateStateAddress({
        city : e.target.value,
    });
  }
  setZip = (e) => {
    this.props.updateStateAddress({
        zip : e.target.value,
    });
  }
  setAddState = (e) => {
    this.props.updateStateAddress({
        state : e.target.value,
    });
  }

  render() {
    var textStyles = {
        fontSize : '15px',
        marginTop : '3px',
    }
    
    return(
      <div style={{paddingBottom : '5px', borderBottom: '1px solid black'}}>
        <div style={{fontSize : '18px', marginTop: '7px', marginBottom: '7px'}}> Address</div>
        <div style={textStyles}>Full Name</div>
        <input type='input' placeholder='Jason Ou' className='checkOutInputField' onChange={(e) => { this.setName(e) }}></input>
        <div style={textStyles}>Email</div>
        <input type='input' placeholder='jason@jasonandfriends.net' className='checkOutInputField' onChange={(e) => { this.setEmail(e) }}></input>
        {/* <div style={textStyles}>Phone</div>
        <input type='input' placeholder='800-888-8888' className='checkOutInputField' onChange={(e) => { this.setPhone(e) }}></input> */}
        <div style={textStyles}>Address One</div>
        <input type='input' placeholder='154 Stuyvesant Oval' className='checkOutInputField' onChange={(e) => { this.setAddOne(e) }}></input>
        <div style={textStyles}>Address Two (Optional)</div>
        <input type='input' placeholder='12c' className='checkOutInputField' onChange={(e) => { this.setAddTwo(e) }}></input>
        <div style={textStyles}>City</div>
        <input type='input' placeholder='New York' className='checkOutInputField' onChange={(e) => { this.setCity(e) }}></input>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{width: '49%'}}>
                <div style={textStyles}>Zip Code</div>
                <input type='input' placeholder='10012' className='checkOutInputField' onChange={(e) => { this.setZip(e) }}></input>
            </div>
            <div style={{width: '49%'}}>
                <div style={textStyles}>State</div>
                <input type='input' placeholder='NY' className='checkOutInputField' onChange={(e) => { this.setAddState(e) }}></input>
            </div>
        </div>
      </div>
    )
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDelivery);