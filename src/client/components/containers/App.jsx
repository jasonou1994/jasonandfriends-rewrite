import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/actions';
import Gallery from './Gallery.jsx';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import BlowUp from './BlowUp.jsx';
import Cart from './Cart.jsx';
import GreyScreen from './GreyScreen.jsx';
import Confirmation from './Confirmation.jsx';

const mapStateToProps = store => ({
  isDisplayedSideBar : store.state.isDisplayedSideBar,
});

const mapDispatchToProps = dispatch => ({
  updateStateImages : (displayedImages, tag) => {
    dispatch(actions.updateStateImages(displayedImages, tag));
  },
  updateStateCart : (cart) => {
    dispatch(actions.updateStateCart(cart));
  }
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.pullImagesFromDB('featured');
    this.pullCartFromDB();
  }

  pullCartFromDB () {
    let uri = '/utils/cart';
    fetch(uri)
      .then(response => {
          return response.json();
      })
      .then(json => {
          this.props.updateStateCart(json);
      })
  }
  
  pullImagesFromDB(tag) {
    tag = tag.replace(/&/g, "%26");
    let displayedImages = [];
    let uri = '/utils/image?tag=' + tag;

    fetch(uri)
      .then(response => {
        return response.json();
      })
      .then(json => {
        json.forEach(image => {
          displayedImages.push(image);
        });
        this.props.updateStateImages(displayedImages, tag);
      })
  }

  render() {
    return(
      <div id='app'>
        <BlowUp></BlowUp>
        <Cart></Cart>
        <Confirmation></Confirmation>
        <GreyScreen></GreyScreen>
        <Header></Header>
        <Sidebar sidebarLinkClick={this.pullImagesFromDB}></Sidebar>
        <Gallery></Gallery>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);