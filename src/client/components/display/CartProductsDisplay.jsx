import React from "react";
import PropTypes from "prop-types";
import CartProduct from './CartProduct.jsx';

const CartProductsDisplay = ({cartProducts, removeItemFromDB}) => {

  let cartProductContainerHeight;
  let cartProductArr = [];

  if (cartProducts.length > 0) {
    cartProducts.forEach((product, index) => {
      cartProductArr.push(<CartProduct key={index} product={product} imageContainerWidth={350} deleteHandler={removeItemFromDB}></CartProduct>)
    });
  
    switch (cartProducts.length) {
      case 1:{
        cartProductContainerHeight = 89;
        break;
      }
      case 2:{
        cartProductContainerHeight = 172;
        break;
      }
      case 3:{
        cartProductContainerHeight = 255;
        break;
      }
      default:{
        cartProductContainerHeight = 255;
        break;
      }
    }
  } else {
    cartProductArr.push(<div key={0}>Looks like your cart is empty!<br></br>You can add some items by clicking on any image.</div>)
    cartProductContainerHeight = 60;
  }

  return (
    <div style={{display : 'flex', flexDirection : 'column', marginTop: '3px', height : cartProductContainerHeight, overflow: 'scroll', borderBottom: '1px solid #383838'}}>
      {cartProductArr}
    </div>
  )
};

CartProductsDisplay.propTypes = {
  cartProducts: PropTypes.array.isRequired,
  removeItemFromDB: PropTypes.func.isRequired,
};

export default CartProductsDisplay;

