import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

const mapStateToProps = store => ({
  cartProducts : store.state.cartProducts
});

const mapDispatchToProps = dispatch => ({
  showCart : () => {
    dispatch(actions.showCart());
  }
});

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div style={styles}>
        <div id='sideBarToggle'>
          <img src={__dirname + 'assets/icons/menuicon.png'} style={{width: '70px', cursor : 'pointer', background: 'green'}} onClick={this.props.showCart}></img>
        </div>
      
        <div id='titles'>
          <h1 style={{marginBottom:'-5px'}}>JASONANDFRIENDS</h1>
          <h3 style={{marginBottom: '20px'}}>PORTFOLIO & PHOTOGRAPHY</h3>
        </div>

        <div style={{display : 'flex', justifyContent:'flex-end', alignItems: 'center', width: '25%'}}> 
          <span style={{fontSize : '30px', fontWeight: 'bold', marginTop : '-23px'}}>{this.props.cartProducts.length}</span>
          <img src={__dirname + 'assets/icons/shoppingCartBlack.png'} style={{width: '44px', alignSelf : 'center', flex: '0 0 auto', margin : '-24px 5px 0px 5px', cursor : 'pointer'}} onClick={this.props.showCart}></img>
        </div>
      </div>
    )
  }
}

const styles = {
  fontFamily : 'Raleway, Arial, sans-serif',
  textDecorationStyle : 'solid',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent : 'space-between',
  width: '100%',
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);