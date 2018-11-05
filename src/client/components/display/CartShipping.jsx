import React from "react";
import PropTypes from "prop-types";

const CartShipping = ({}) => (
  <div style={styles}>
   <div style={{fontSize : '18px', marginTop: '7px', marginBottom: '7px'}}> Shipping</div>
    <div style={{marginBottom: '10px', fontSize: '14px'}}>
      Free shipping is included with all prints! Orders are shipped via FedEx and should arrive within 5-8 business days. 
    </div>
    <div style={{marginBottom: '10px', fontSize: '14px'}}>
      Shipping is currently only available within the US.
    </div>
    <div style={{marginBottom: '10px', fontSize : '14px'}}>
      Please proceed to process your payment securely with Square.
    </div>
  </div>
);

const styles = {
  display : 'flex',
  flexDirection : 'column',
  overflow: 'scroll',
  borderBottom: '1px solid #383838',
}

CartShipping.propTypes = {
    // imageList: PropTypes.object.isRequired,
};

export default CartShipping;