import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Container = (props) => {
  const { children, internet } = props;
  return (<div>
    <h1>Interfaces<div className={internet ? 'label label-success pull-right' : 'label label-danger pull-right'}>internet</div></h1>
    <hr />
    {children}
  </div>);
};

Container.propTypes = {
  children: PropTypes.element.isRequired,
  internet: PropTypes.bool
};

Container.defaultProps = {
  internet: false
};

function mapStateToProps(state) {
  return {
    internet: state.interfaces.hardware.internet
  };
}

export default connect(mapStateToProps)(Container);
