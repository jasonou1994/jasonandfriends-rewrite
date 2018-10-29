import React from "react";
import PropTypes from "prop-types";

const HeadImage = ({centerImage}) => (
  <div style={styles}>
      {centerImage}
  </div>
);

const styles = {
    display: 'flex',
    width: '100%',
}

HeadImage.propTypes = {
    centerImage: PropTypes.array.isRequired,
};

export default HeadImage;