import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import SidebarLink from "./SidebarLink.jsx";
import * as actions from '../../actions/actions';

const mapStateToProps = store => ({
  screenWidth : store.state.screenWidth,
  isDisplayedSideBar : store.state.isDisplayedSideBar,
})
const mapDispatchToProps = dispatch => ({
  updateSideBarHeight : (height) => {
    dispatch(actions.updateSideBarHeight(height));
  }
});

class Sidebar extends Component {

  constructor(props) {
    super (props);
    this.tags = ['FEATURED', 'WILDLIFE', 'LANDSCAPES', 'MACRO & ABSTRACT', 'CITIES & CULTURE', 'PORTRAITS'];
    this.updateHeight = this.updateHeight.bind(this);
  }

  componentDidUpdate(){
    this.updateHeight();
  }
  updateHeight() {
    this.props.updateSideBarHeight(this.divElement.clientHeight);
  }

  render() {
    let height;
    let padding;
    let marginBottom;
    if(this.props.screenWidth <= 800) {
      height = this.props.isDisplayedSideBar ? 'auto' : '0px';
      padding = this.props.isDisplayedSideBar ? '0px 10px 0px 10px' : '0px';
    }
    let styles = {
      height : height,
      padding : padding,
    }

    const sidebarLinks = [];
    this.tags.forEach((tag, index) => {
      sidebarLinks.push(<SidebarLink tag={tag} key={index} sidebarLinkClick={this.props.sidebarLinkClick}></SidebarLink>)
    });

    return (
      <div style={styles} id='sideBar' ref={(divElement) => this.divElement=divElement}>
       {sidebarLinks}
      </div>
    );
  }
  
};

Sidebar.propTypes = {
  sidebarLinkClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);