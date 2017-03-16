import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Main } from '../components/main';
import { load } from '../../../modules/interfaces/actions';

class ContainerMain extends Component {
  static propTypes = {
    loadList: PropTypes.bool.isRequired,
    load: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.load();
  }

  render() {
    if (this.props.loadList) {
      return <p>...</p>;
    }
    return (<Main {...this.props} />);
  }
}

function mapStateToProps(state) {
  return {
    loadList: state.interfaces.loadList,
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
