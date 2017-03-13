import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const ContainerPage = props => (
  <div>
    <h1>Hardware</h1>
    <hr />
    {props.children}
  </div>
);

ContainerPage.propTypes = {
  children: PropTypes.element.isRequired
};

export default connect()(ContainerPage);
