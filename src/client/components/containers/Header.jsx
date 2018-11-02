import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

const mapStateToProps = store => ({
  cartProducts : store.state.cartProducts,
  screenWidth : store.state.screenWidth,
});

const mapDispatchToProps = dispatch => ({
  showCart : () => {
    dispatch(actions.showCart());
  },
  toggleSideBar : () => {
    dispatch(actions.toggleSideBar());
  }
});

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let cartImage = this.props.screenWidth <= 800 ? 'assets/icons/shoppingCartWhite.png' : 'assets/icons/shoppingCartBlack.png'

    return(
      <div id='header' style={styles} ref={(divElement) => this.divElement=divElement}>
        <div id='sideBarToggle' style={{position: "absolute", left: '0px'}}>
          <img src={__dirname + 'assets/icons/menuicon.png'} style={{width: '70px', cursor : 'pointer'}} onClick={this.props.toggleSideBar}></img>
        </div>
      
        <div id='titles'>
          <h1 style={{marginBottom:'-5px'}}>JASON OU</h1>
          <h3 style={{marginBottom: '20px'}}>PORTFOLIO & PHOTOGRAPHY</h3>
        </div>

        <div style={{position: 'absolute', right: '0px', display : 'flex', justifyContent:'flex-end', alignItems: 'center'}}> 
          <span style={{fontSize : '30px', fontWeight: 'bold', marginTop : '17px'}}>{this.props.cartProducts.length}</span>
          <img src={cartImage} style={{width: '44px', alignSelf : 'center', flex: '0 0 auto', margin : '17px 15px 0px 5px', cursor : 'pointer'}} onClick={this.props.showCart}></img>
        </div>
      </div>
    )
  }
}

const styles = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);