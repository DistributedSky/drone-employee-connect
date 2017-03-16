import React, { PropTypes } from 'react';
import Select from './select';
import Form from './form';

const Main = props => (
  <div>
    <Select {...props} />
    <hr />
    <Form {...props} />
  </div>
);

Main.propTypes = {
  hasFields: PropTypes.bool
};

Main.defaultProps = {
  hasFields: false
};

export default Main;
