import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Main } from '../components/new';
import { runDocker } from '../../../modules/interfaces/actions';

class ContainerNew extends Component {
  componentWillMount() {
    console.log(this);
  }

  render() {
    return (<Main {...this.props} />);
  }
}

function mapStateToProps(state) {
  return {
    newStatus: state.interfaces.docker,
    wlans: (_.has(state.interfaces.hardware, 'wlans')) ? state.interfaces.hardware.wlans : [],
    containers: state.interfaces.list
  };
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    runDocker
  }, dispatch);
  return {
    runDocker: actions.runDocker
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerNew);
