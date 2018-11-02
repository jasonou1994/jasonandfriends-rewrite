import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/actions';

const mapStateToProps = store => ({
    imageForBlowUp : store.state.imageForBlowUp,
    isDisplayedBlowUp : store.state.isDisplayedBlowUp
})
const mapDispatchToProps = dispatch => ({
    hideBlowUpImage : () => {
        dispatch(actions.hideBlowUpImage());
    },
    pullCartFromDB : () => {
        let uri = 'http://localhost:3000/utils/cart';
        fetch(uri)
            .then(response => {
                return response.json();
            })
            .then(json => {
                dispatch(actions.updateStateCart(json));
            })
    }
});

class BlowUp extends Component {
  constructor(props) {
    super(props);
    this.state={
        displayedPrice : 0,
        quantity : 1,
        size : '12x18',
    }
    this.updateDisplayedPrice = this.updateDisplayedPrice.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.addProductToCart = this.addProductToCart.bind(this);
  }

  updateDisplayedPrice(event) {
    this.setState({displayedPrice : event.target.value});
    this.setState({size : event.target.options[event.target.selectedIndex].text});
  }
  updateQuantity(event) {
    this.setState({quantity : Number.parseInt(event.target.value)});
  }

  addProductToCart() {
    let postObj = {
        imageName : this.props.imageForBlowUp.name,
        size : this.state.size,
        price : this.state.displayedPrice,
        quantity : this.state.quantity,
    }
    fetch('http://localhost:3000/utils/cart',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(postObj),
    })
    .then(() => this.props.pullCartFromDB());
  }
  
  render() {
    
    const imageStyles = {
         width:'100%',
    }

    const overallStyles = {
        display : this.props.isDisplayedBlowUp
    }

    let priceSelectArr = [];
    if(this.props.imageForBlowUp) {
      //set initial price
      if(this.state.displayedPrice === 0 ) {
          this.setState({displayedPrice : this.props.imageForBlowUp.prices[0].amount});
      }
      this.props.imageForBlowUp.prices.forEach((priceObj,index) => {
          priceSelectArr.push(<option key={index} value={priceObj.amount}>{priceObj.size}</option>)
      });
    }
    let quantitySelectArr = [];
    for(let i = 1; i <= 9; i++){
        quantitySelectArr.push(<option key={i} value={i}>{i}</option>)
    }

    return(
      <div id='blowUp' style={overallStyles}>
        <img style={{position: 'absolute', top: '20px', left: '20px', width: '5%', cursor : 'pointer'}} src={__dirname + 'assets/icons/cross.png'} onClick={this.props.hideBlowUpImage}></img>
        <img src={__dirname + 'assets/full/' + this.props.imageForBlowUp.name} style={imageStyles}></img>
        <div style={{display: 'flex', flexWrap: 'wrap', padding: '10px'}}>
            <div style={{width : '100%', fontSize : '25px', borderBottom: '1px solid rgb(200,200,200)', paddingBottom: '4px', marginBottom: '10px'}}>Buy Prints</div>
            <div style={{width: '60%' ,display: 'flex', flexDirection:'column'}}>
                <span style={{fontSize: '18px', marginBottom: '5px'}}>Description:</span>
                <div>
                • Printed on Epson Ultra Premium Luster Photo Paper <br></br>
                • 10mm thick <br></br>
                • Slightly glossy <br></br>
                • Fingerprint resistant
                </div>
            </div>
            <div style={{width: '40%', display: 'flex', flexDirection:'column'}}>
                <div style={{fontSize: '18px'}}>Size (in inches):</div>
                <select id='priceSelect' onChange={this.updateDisplayedPrice} style={{marginBottom : '10px'}}>
                    {priceSelectArr}
                </select>
                <div style={{fontSize: '18px'}}>Quantity:</div>
                <select id='quantitySelect' onChange={this.updateQuantity} style={{marginBottom : '10px'}}>
                    {quantitySelectArr}
                </select>
            </div>
            <div style={{width : '100%', display: 'flex', alignItems: 'center'}}>
                <span style={{width : '60%', fontSize : '25px', fontWeight : 'bold'}}>{this.state.displayedPrice}</span>
                <div id='blowUpButton' style={{width : '40%'}} onClick={() => { this.addProductToCart(); this.props.hideBlowUpImage()}}>Add to Cart</div>
            </div>
        </div>
      </div>
    )
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(BlowUp);