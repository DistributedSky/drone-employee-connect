import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Main } from '../components/new';
import { setActive, load } from '../../../modules/params/actions';
import { runDocker } from '../../../modules/interfaces/actions';

class ContainerNew extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    load: PropTypes.func.isRequired
  };

  componentWillMount() {
    if (_.isEmpty(this.props.list)) {
      this.props.load();
    }
  }

  render() {
    return (<Main {...this.props} />);
  }
}

function mapStateToProps(state) {
  let fields = [];
  let hasFields = false;
  if (state.params.active !== '' && _.has(state.params.list, state.params.active)) {
    fields = state.params.list[state.params.active];
    hasFields = true;
  }
  return {
    newStatus: state.interfaces.docker,
    wlans: (_.has(state.interfaces.hardware, 'wlans')) ? state.interfaces.hardware.wlans : [],
    containers: state.interfaces.list,
    active: state.params.active,
    hasFields,
    fields,
    list: _.keys(state.params.list),
    loadList: state.params.loadList
  };
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    setActive,
    load,
    runDocker
  }, dispatch);
  return {
    setActive: actions.setActive,
    load: actions.load,
    runDocker: actions.runDocker
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerNew);
