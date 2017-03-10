import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Container = (props) => {
  const { children } = props;
  return (<div>
    <h1>Interfaces</h1>
    <hr />
    {children}
  </div>);
};

Container.propTypes = {
  children: PropTypes.element.isRequired
};

export default connect()(Container);
