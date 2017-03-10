import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { getHardware } from '../../../modules/interfaces/actions';

class Container extends Component {
  componentWillMount() {
    if (!this.props.isHardware) {
      this.props.getHardware();
    }
  }

  componentWillReceiveProps(next) {
    if (!next.isHardware) {
      this.props.getHardware();
    }
  }

  render() {
    const { children, internet } = this.props;
    return (<div>
      <h1>Interfaces<div className={internet ? 'label label-success pull-right' : 'label label-danger pull-right'}>internet</div></h1>
      <hr />
      {children}
    </div>);
  }
}

Container.propTypes = {
  children: PropTypes.element.isRequired,
  internet: PropTypes.bool,
  isHardware: PropTypes.bool.isRequired,
  getHardware: PropTypes.func.isRequired
};

Container.defaultProps = {
  internet: false
};

function mapStateToProps(state) {
  return {
    internet: state.interfaces.hardware.internet,
    isHardware: !_.isEmpty(state.interfaces.hardware)
  };
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    getHardware,
  }, dispatch);
  return {
    getHardware: actions.getHardware,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
