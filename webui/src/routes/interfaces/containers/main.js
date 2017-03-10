import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Main } from '../components/main';
import { load } from '../../../modules/interfaces/actions';

class ContainerMain extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    exist: PropTypes.bool.isRequired
  };

  componentWillMount() {
    if (!this.props.exist) {
      this.props.load();
    }
  }

  componentWillReceiveProps(next) {
    if (!next.exist) {
      this.props.load();
    }
  }

  render() {
    if (!this.props.exist) {
      return (<p>...</p>);
    }
    return (<Main {...this.props} />);
  }
}

function mapStateToProps(state) {
  return {
    list: state.interfaces.list,
    exist: !_.isEmpty(state.interfaces.list)
  };
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    load
  }, dispatch);
  return {
    load: actions.load
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerMain);
