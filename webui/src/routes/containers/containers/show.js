import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Main } from '../components/show';
import { getStatusDocker, getLog, remove } from '../../../modules/interfaces/actions';

class ContainerShow extends Component {
  static propTypes = {
    empty: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    getStatusDocker: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    getLog: PropTypes.func.isRequired
  };

  componentWillMount() {
    if (!this.props.empty) {
      this.props.getStatusDocker(this.props.name);
      this.props.getLog();
    } else {
      this.context.router.push('/');
    }
  }

  componentWillReceiveProps(next) {
    if (next.name !== this.props.name) {
      this.props.getStatusDocker(next.name);
    }
  }

  render() {
    if (!this.props.empty) {
      return (<Main {...this.props} />);
    }
    return null;
  }
}

function mapStateToProps(state, props) {
  const item = _.find(state.interfaces.list, { name: props.params.name });
  if (_.isEmpty(item)) {
    return {
      empty: true,
      name: '',
      status: ''
    };
  }
  return {
    empty: false,
    name: props.params.name,
    status: item.status,
    log: item.log
  };
}
function mapDispatchToProps(dispatch, props) {
  const actions = bindActionCreators({
    getStatusDocker,
    getLog,
    remove
  }, dispatch);
  return {
    getStatusDocker: actions.getStatusDocker,
    getLog: () => actions.getLog(props.params.name),
    onRemove: actions.remove
  };
}

ContainerShow.contextTypes = {
  router: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainerShow);
