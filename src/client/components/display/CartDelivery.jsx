import React from "react";
import PropTypes from "prop-types";

const CartDelivery = ({imageList}) => (
  <div style={{paddingBottom : '5px', borderBottom: '1px solid black'}}>
     <div style={{fontSize : '18px', marginTop: '7px', marginBottom: '7px'}}>Shipping Address</div>
     <div style={textStyles}>Full Name</div>
     <input type='input' placeholder='Jason Ou' className='checkOutInputField'></input>
     <div style={textStyles}>Email</div>
     <input type='input' placeholder='jason@jasonandfriends.net' className='checkOutInputField'></input>
     <div style={textStyles}>Phone</div>
     <input type='input' placeholder='800-888-8888' className='checkOutInputField'></input>
     <div style={textStyles}>Address One</div>
     <input type='input' placeholder='154 Stuyvesant Oval' className='checkOutInputField'></input>
     <div style={textStyles}>Address Two (Optional)</div>
     <input type='input' placeholder='12c' className='checkOutInputField'></input>
     <div style={textStyles}>City</div>
     <input type='input' placeholder='New York' className='checkOutInputField'></input>
     <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '49%'}}>
            <div style={textStyles}>Zip Code</div>
            <input type='input' placeholder='10012' className='checkOutInputField'></input>
        </div>
        <div style={{width: '49%'}}>
            <div style={textStyles}>State</div>
            <input type='input' placeholder='NY' className='checkOutInputField'></input>
        </div>
     </div>

  </div>
);

var textStyles = {
    fontSize : '15px',
    marginTop : '3px',
}

CartDelivery.propTypes = {
    imageList: PropTypes.array.isRequired,
};

export default CartDelivery;