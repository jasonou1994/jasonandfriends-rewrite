import React from "react";
import PropTypes from "prop-types";

const CartCheckOutBanner = ({currentStage}) => {
  let bannerContents = [];
  bannerContents.push(<div key={0} style={{
    borderStyle : 'solid',
    borderColor : '#007bff',
    lineHeight : '22px',
    textAlign : 'center',
    width : '33%',
    boxSizing : 'border-box',
    color : currentStage === 'Delivery' ? 'white' : '#007bff',
    background: currentStage === 'Delivery' ? '#007bff' : '#F5f5f5',
    borderWidth : '1x 1px 1px 0px',
  }}>Delivery</div>);
  bannerContents.push(<div key={1}  style={{
    borderStyle : 'solid',
    borderColor : '#007bff',
    borderWidth : '1px 1px 1px 0px',
    lineHeight : '22px',
    textAlign : 'center',
    width : '33%',
    boxSizing : 'border-box',
    color : currentStage === 'Billing' ? 'white' : '#007bff',
    background: currentStage === 'Billing' ? '#007bff' : '#F5f5f5'
  }}>Billing</div>);
  bannerContents.push(<div key={2}  style={{
    borderStyle : 'solid',
    borderColor : '#007bff',
    borderWidth : '1px 1px 1px 0px',
    lineHeight : '22px',
    textAlign : 'center',
    width : '33%',
    boxSizing : 'border-box',
    color : currentStage === 'Confirm' ? 'white' : '#007bff',
    background: currentStage === 'Confirm' ? '#007bff' : '#F5f5f5'
  }}>Confirm</div>);

  return (
    <div style={containerStyles}>
      {bannerContents}
    </div>
  )
};

const containerStyles = {
  borderStyle : 'solid',
  borderColor : '#007bff',
  borderWidth : '0px 0px 0px 1px',
  height : '24px',
  width : '100%',
  display: 'flex',
  boxSizing : 'border-box',
  marginTop : '5px',
}

const contentStyles = 

CartCheckOutBanner.propTypes = {
    imageList: PropTypes.array.isRequired,
};

export default CartCheckOutBanner;