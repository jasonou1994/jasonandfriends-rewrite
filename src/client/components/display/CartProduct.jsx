import React from "react";
import PropTypes from "prop-types";

const CartProduct = ({product, imageContainerWidth, deleteHandler}) => (
  <div style={styles}>
    <div style={{height : '80px', width : '80px'}}>
      <img src={__dirname + 'assets/thumbnails/' +product.imageName} style={{width : '100%', height: '100%', objectFit : 'cover'}}></img>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between', width : imageContainerWidth-80+'px'}}>
      <div style={{display:'flex',flexDirection:'column', justifyContent : 'center', margin: '0px 10px 0px 10px'}}>
        <div style={{fontSize:'18px'}}>Size: <span style={{fontSize:'16px'}}>{product.size}</span></div>
        <div style={{fontSize:'18px'}}>Price: <span style={{fontSize:'16px'}}>${product.price}</span></div>
        <div style={{fontSize:'18px'}}>Subtotal: <span style={{fontSize:'16px'}}>${product.price * product.quantity}</span></div>
      </div>
      <div style={{display:'flex',flexDirection:'column',justifyContent : 'center'}}>
        <div>Quantity: {product.quantity}</div>
        <div className='cartProductDeleteButton' onClick={() => deleteHandler(product)}>Delete</div>
      </div>
    </div>
  </div>
);

const styles = {
  display: 'flex',
  width: '100%',
  height: '80px',
  padding: '3px',
  boxSizing : 'border-box',
  minHeight: 86,
  borderBottom: '1px solid rgb(220,220,220)'
}

CartProduct.propTypes = {
  product: PropTypes.object.isRequired,
  imageContainerWidth: PropTypes.number.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default CartProduct;