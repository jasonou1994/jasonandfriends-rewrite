import React from "react";
import PropTypes from "prop-types";
import SidebarLink from "./SidebarLink.jsx";


const Sidebar = ({sidebarLinkClick}) => {

  const tags = ['FEATURED', 'WILDLIFE', 'LANDSCAPES', 'MACRO & ABSTRACT', 'CITIES & CULTURE', 'PORTRAITS'];
  const sidebarLinks = [];
  tags.forEach((tag, index) => {
    sidebarLinks.push(<SidebarLink tag={tag} key={index} sidebarLinkClick={sidebarLinkClick}></SidebarLink>)
  });

  return (
    <div style={styles}>
     {sidebarLinks}
    </div>
  );
};

Sidebar.propTypes = {
  sidebarLinkClick: PropTypes.func.isRequired,
};

let styles = {
  width : '16%',
  height : '100%',
  fontFamily : 'Raleway, Arial, sans-serif',
  textDecorationStyle : 'solid',
  color: 'grey',
  textAlign : 'left',
  padding: '5px',
  paddingTop : '-3px',
  paddingRight : '10px',
  lineHeight : '20px',
  boxSizing : 'border-box'
}

export default Sidebar;