import React, { PropTypes } from 'react';

const Main = props => (
  <div>
    {props.exist ?
      <p>select container</p>
      :
      <p>no containers</p>
    }
  </div>
);

Main.propTypes = {
  exist: PropTypes.bool
};

Main.defaultProps = {
  exist: false
};

export default Main;
