import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Main } from '../components/show';
import { getInfo, connect as connectHadle, getStatusDocker, runDocker, getHardware, getDrone } from '../../../modules/interfaces/actions';

class ContainerShow extends Component {
  static propTypes = {
    empty: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    isInfo: PropTypes.bool.isRequired,
    getInfo: PropTypes.func.isRequired,
    isContainer: PropTypes.bool.isRequired,
    getStatusDocker: PropTypes.func.isRequired,
    isDrone: PropTypes.bool.isRequired,
    getDrone: PropTypes.func.isRequired,
    isHardware: PropTypes.bool.isRequired,
    getHardware: PropTypes.func.isRequired,
  };

  componentWillMount() {
    if (!this.props.empty) {
      if (!this.props.isInfo) {
        this.props.getInfo();
      }
      if (!this.props.isContainer) {
        this.props.getStatusDocker(this.props.name);
      }
      if (!this.props.isDrone) {
        this.props.getDrone();
      }
      if (!this.props.isHardware) {
        this.props.getHardware();
      }
    } else {
      this.context.router.push('/');
    }
  }

  componentWillReceiveProps(next) {
    if (!next.isInfo) {
      this.props.getInfo();
    }
    if (!next.isContainer) {
      this.props.getStatusDocker(next.name);
    }
    if (!next.isDrone) {
      this.props.getDrone();
    }
    if (!next.isHardware) {
      this.props.getHardware();
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
      isInfo: false,
      isContainer: false,
      isDrone: false,
      isHardware: false,
    };
  }
  return {
    empty: false,
    name: props.params.name,
    list: state.interfaces.list,
    isConnect: item.connect,
    info: item.info,
    isInfo: !_.isEmpty(item.info),
    container: item.container,
    isContainer: !_.isEmpty(item.container),
    hardware: state.interfaces.hardware,
    isHardware: !_.isEmpty(state.interfaces.hardware),
    drone: item.drone,
    isDrone: !_.isEmpty(item.drone),
  };
}
function mapDispatchToProps(dispatch, props) {
  const actions = bindActionCreators({
    connectHadle,
    getInfo,
    getStatusDocker,
    runDocker,
    getDrone,
    getHardware,
  }, dispatch);
  return {
    connectHadle: (ssid, password) => actions.connectHadle(props.params.name, ssid, password),
    getInfo: () => actions.getInfo(props.params.name),
    getStatusDocker: actions.getStatusDocker,
    runDocker: actions.runDocker,
    getDrone: () => actions.getDrone(props.params.name),
    getHardware: actions.getHardware,
  };
}

ContainerShow.contextTypes = {
  router: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainerShow);
