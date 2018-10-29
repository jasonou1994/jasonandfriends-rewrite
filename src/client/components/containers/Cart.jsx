import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
import CartProduct from '../display/CartProduct.jsx';

const mapStateToProps = store => ({
  cartProducts : store.state.cartProducts,
  isDisplayedCart : store.state.isDisplayedCart,
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

  // componentDidUpdate() {
  //   if(this.props.isDisplayedCart === 'none'){
  //     this.setState({width : 0})
  //   } else {
  //     this.setState({width : 0})
  //   }
  // }
  
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

    let height = (this.props.isDisplayedCart === 'none') ? '0px' : 'auto';
    let opacity = (this.props.isDisplayedCart === 'none') ? '0' : '1';
    let zIndex = (this.props.isDisplayedCart === 'none') ? '-1000' : '1000';
    const overallStyles = {
      width: this.state.width+'px',
      height : height,
      opacity : opacity,
      zIndex : zIndex,
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
        <div style={{display : 'flex', flexDirection : 'column', marginTop: '3px', height : cartProductContainerHeight, overflow: 'scroll'}}>
          {cartProductArr}
        </div>
      </div>
    )
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Cart);