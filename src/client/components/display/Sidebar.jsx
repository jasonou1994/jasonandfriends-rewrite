import React from "react";
import PropTypes from "prop-types";
import SidebarLink from "./SidebarLink.jsx";


const Sidebar = ({sidebarLinkClick, isDisplayedSideBar}) => {

  const tags = ['FEATURED', 'WILDLIFE', 'LANDSCAPES', 'MACRO & ABSTRACT', 'CITIES & CULTURE', 'PORTRAITS'];
  const sidebarLinks = [];
  tags.forEach((tag, index) => {
    sidebarLinks.push(<SidebarLink tag={tag} key={index} sidebarLinkClick={sidebarLinkClick}></SidebarLink>)
  });

  let styles = {
    //width : isDisplayedSideBar ? 'initial' : '0%',
    // opacity : isDisplayedSideBar ? '1' : '0',
    // paddingTop : isDisplayedSideBar ? '-3px' : '0px',
    // paddingRight : isDisplayedSideBar ? '10px' : '0px',
    // paddingLeft : isDisplayedSideBar ? '10px' : '0px',
  }

  return (
    <div style={styles} id='sideBar'>
     {sidebarLinks}
    </div>
  );
};

Sidebar.propTypes = {
  sidebarLinkClick: PropTypes.func.isRequired,
  isDisplayedSideBar : PropTypes.bool.isRequired,
};



export default Sidebar;