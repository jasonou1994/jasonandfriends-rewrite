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
    // display : isDisplayedSideBar,
  }

  return (
    <div style={styles}>
     {sidebarLinks}
    </div>
  );
};

Sidebar.propTypes = {
  sidebarLinkClick: PropTypes.func.isRequired,
  isDisplayedSideBar : PropTypes.string.isRequired,
};



export default Sidebar;