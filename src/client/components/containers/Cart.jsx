import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
import CartProduct from '../display/CartProduct.jsx';
import { privateEncrypt } from 'crypto';
import CartCheckOutBanner from '../display/CartCheckOutBanner.jsx';
import CartDelivery from '../display/CartDelivery.jsx';

const mapStateToProps = store => ({
  cartProducts : store.state.cartProducts,
  isDisplayedCart : store.state.isDisplayedCart,
  screenWidth : store.state.screenWidth,
});

const mapDispatchToProps = dispatch => ({
  pullCartFromDB : () => {
    let uri = 'http://localhost:3000/utils/cart';
    fetch(uri)
      .then(response => {
          return response.json();
      })
      .then(json => {
          dispatch(actions.updateStateCart(json));
      })
  },
  hideCart : () => {
    dispatch(actions.hideCart());
  }
});

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state={
      width : 350,
      currentStage : 'Pre',
    }
  }

  removeItemFromDB = (product) => {
    let uri = 'http://localhost:3000/utils/cart'
    fetch(uri,{
      method : 'DELETE',
      headers: {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify({
        imageName : product.imageName,
        size : product.size,
      })
    })
    .then(response => {
      this.props.pullCartFromDB();
    })
  }

  checkOutWithSquare = () => {
    let uri = '/utils/payment';
    fetch (uri, {
      method : 'POST'
    })
    .then (res => res.json())
    .then (res => window.location.href = res.url);
  }
  
  render() {
    let cartProductContainerHeight;
    let cartProductArr = [];
    if (this.props.cartProducts.length > 0) {
      this.props.cartProducts.forEach((product,index) => {
        cartProductArr.push(<CartProduct key={index} product={product} imageContainerWidth={this.state.width} deleteHandler={this.removeItemFromDB}></CartProduct>)
      });

      switch (this.props.cartProducts.length) {
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

    let cartTotalAmount = this.props.cartProducts.map(cartProduct => {
      return cartProduct.price * cartProduct.quantity;
    }).reduce((acc, current) => {
      return acc + current;
    },0);
   
    let cartButtons = [];
    let cartBodyContents = [];

    if(this.state.currentStage === 'Pre'){
      cartButtons.push(<div key={0} className='checkOutButtonBlue' onClick={() => this.setState({ currentStage : 'Delivery' })}>Check Out</div>);

      cartBodyContents.push(
      <div key={0} style={{display : 'flex', flexDirection : 'column', marginTop: '3px', height : cartProductContainerHeight, overflow: 'scroll', borderBottom: '1px solid #383838'}}>
      {cartProductArr}
      </div>)
    } else if (this.state.currentStage === 'Delivery') {
      cartButtons.push(<div key={0} className='checkOutButtonGrey' onClick={() => this.setState({ currentStage : 'Pre' })}>Back</div>);
      cartButtons.push(<div key={1} className='checkOutButtonBlue' onClick={this.checkOutWithSquare}>Pay with Square</div>);

      cartBodyContents.push(<CartDelivery key={0}></CartDelivery>);
    }

    const overallStyles = {
      width: this.props.screenWidth <= 600 ? this.props.screenWidth -20 : '350px',
      height : (this.props.isDisplayedCart === 'none') ? '0px' : 'auto',
      opacity : (this.props.isDisplayedCart === 'none') ? '0' : '1',
      zIndex : this.props.isDisplayedCart === 'none' ? '-1000' : '1000',
    }

    return(
      <div id='cart' style={overallStyles}>
        <div style={{width: '100%', display:'flex', alignItems:'center', borderBottom: '1px solid #383838'}}>
          <span style={{fontSize : '26px'}}>Cart</span>
          <div style={{display:'flex', justifyContent : 'flex-end'}}>
            <span style={{fontSize : '22px', marginTop: '4px'}}>{this.props.cartProducts.length}</span>
            <img src={__dirname + 'assets/icons/shoppingCartBlack.png'} style={{width: '7%', alignSelf : 'center', flex: '0 0 auto', marginTop: '2px', marginLeft: '6px' , marginRight: '20px'}}></img>
            <img style={{top: '20px', right: '20px', width: '6%', alignSelf : 'center', flex: '0 0 auto', cursor : 'pointer'}} src={__dirname + 'assets/icons/cross black.png'} onClick={this.props.hideCart}></img>
          </div>
        </div>

        {cartBodyContents}

        <div style={{display: 'flex', justifyContent : 'space-between', marginTop: '5px'}}>
          <div style={{fontSize : '24px'}}>${cartTotalAmount}</div>
          <div style={{display: 'flex'}}>
            {cartButtons}
          </div>   
        </div>
      </div>
    )
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Cart);