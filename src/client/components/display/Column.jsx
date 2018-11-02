import React from "react";
import PropTypes from "prop-types";

const Column = ({imageList}) => (
  <div className = 'column' style={styles}>
      {imageList}
  </div>
);

const styles = {
    // display: 'flex',
    // flexDirection : 'column',
    // width: '50%',
}

Column.propTypes = {
    imageList: PropTypes.array.isRequired,
};

export default Column;