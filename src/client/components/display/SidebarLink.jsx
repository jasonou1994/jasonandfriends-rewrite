import React from "react";
import PropTypes from "prop-types";

const SidebarLink = ({tag, sidebarLinkClick}) => (
  <div className='sideBarLink' style={styles} onClick={() => sidebarLinkClick(tag.toLowerCase())}>
    {tag}
  </div>
);

SidebarLink.propTypes = {
  tag: PropTypes.string.isRequired,
  sidebarLinkClick: PropTypes.func.isRequired
};

let styles = {
   
}

export default SidebarLink;