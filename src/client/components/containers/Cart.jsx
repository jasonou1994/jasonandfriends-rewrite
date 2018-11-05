import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
import CartDelivery from '../display/CartDelivery.jsx';
import CartProductsDisplay from '../display/CartProductsDisplay.jsx';
import CartShipping from '../display/CartShipping.jsx';

const mapStateToProps = store => ({
  cartProducts : store.state.cartProducts,
  isDisplayedCart : store.state.isDisplayedCart,
  screenWidth : store.state.screenWidth,
});

const mapDispatchToProps = dispatch => ({
  hideCart : () => {
    dispatch(actions.hideCart());
  },
  updateStateCart : (cart) => {
    dispatch(actions.updateStateCart(cart));
  }
});

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state={
      currentStage : 'Pre',
      address : {},
    }
    this.updateStateAddress = this.updateStateAddress.bind(this);
  }

  pullCartFromDB() {
    let uri = '/utils/cart';
    fetch(uri)
      .then(response => {
          return response.json();
      })
      .then(json => {
          this.props.updateStateCart(json);
      })
  }

  removeItemFromDB = (product) => {
    let uri = '/utils/cart'
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
      this.pullCartFromDB();
    })
  }

  checkOutWithSquare = () => {
    let uri = '/utils/payment';
    fetch (uri, {
      method : 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify({
        address : this.state.address,
      })
    })
    .then (res => res.json())
    .then (res => window.location.href = res.url);
  }

  updateStateAddress (address) {
    this.setState({
      address : {
        ...this.state.address,
        [Object.keys(address)[0]] : Object.values(address)[0],
      }
    });
  }
  
  render() {
    console.log(this.state);

    const overallStyles = {
      width: this.props.screenWidth <= 600 ? this.props.screenWidth -20 : '350px',
      height : (this.props.isDisplayedCart === 'none') ? '0px' : 'auto',
      opacity : (this.props.isDisplayedCart === 'none') ? '0' : '1',
      zIndex : this.props.isDisplayedCart === 'none' ? '-1000' : '1000',
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
      cartBodyContents.push(<CartProductsDisplay key={0} cartProducts={this.props.cartProducts} removeItemFromDB={this.removeItemFromDB}></CartProductsDisplay>);

    } else if (this.state.currentStage === 'Delivery') {

      cartButtons.push(<div key={0} className='checkOutButtonGrey' onClick={() => this.setState({ currentStage : 'Pre' })}>Back</div>);
      cartButtons.push(<div key={1} className='checkOutButtonBlue' onClick={() => this.setState({ currentStage : 'Shipping' })}>Next</div>);
      cartBodyContents.push(<CartDelivery key={0} updateStateAddress={this.updateStateAddress}></CartDelivery>);

    } else if (this.state.currentStage === 'Shipping') {

      cartButtons.push(<div key={0} className='checkOutButtonGrey' onClick={() => this.setState({ currentStage : 'Delivery' })}>Back</div>);
      cartButtons.push(<div key={1} className='checkOutButtonBlue' onClick={this.checkOutWithSquare}>Pay with Square</div>);
      cartBodyContents.push(<CartShipping key={0}></CartShipping>)

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