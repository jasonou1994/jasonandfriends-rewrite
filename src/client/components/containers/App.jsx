import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/actions';
import Gallery from './Gallery.jsx';
import Sidebar from '../display/Sidebar.jsx';
import Header from './Header.jsx';
import BlowUp from './BlowUp.jsx';
import Cart from './Cart.jsx';
import GreyScreen from './GreyScreen.jsx';

const mapStateToProps = store => ({
});

const mapDispatchToProps = dispatch => ({
  pullImagesFromDB : (tag) => {
    tag = tag.replace(/&/g, "%26");
    let displayedImages = [];
    let uri = 'http://localhost:3000/utils/image?tag=' + tag;

    fetch(uri)
      .then(response => {
        return response.json();
      })
      .then(json => {
        json.forEach(image => {
          displayedImages.push(image);
        });
        //console.log(displayedImages);
        dispatch(actions.updateStateImages(displayedImages));
      })
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

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.pullImagesFromDB('featured');
    this.props.pullCartFromDB();
  }

  render() {
    return(
      <div id='app'>
        <BlowUp></BlowUp>
        <Cart></Cart>
        <GreyScreen></GreyScreen>
        <Header></Header>
        <Sidebar sidebarLinkClick={this.props.pullImagesFromDB}></Sidebar>
        <Gallery></Gallery>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);