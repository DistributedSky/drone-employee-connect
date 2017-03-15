import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Header from '../components/app/header';
import Footer from '../components/app/footer';
import Notification from '../components/app/notification';
import { load, getHardware } from '../../modules/interfaces/actions';
import { setError } from '../../modules/app/actions';

import './style.css';

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    error: PropTypes.string,
    internet: PropTypes.bool.isRequired,
    load: PropTypes.func.isRequired,
    getHardware: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
  };
  static defaultProps = {
    error: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      interval: null
    };
  }

  componentWillMount() {
    this.props.load();
    if (_.isEmpty(this.state.interval)) {
      this.props.getHardware();
      const interval = setInterval(this.props.getHardware, 15000);
      this.setState({ interval });
    }
  }

  render() {
    return (<div>
      <Header title={this.props.title} internet={this.props.internet} />
      <div className="container">
        <Notification message={this.props.error} onClose={() => this.props.setError('')} />
        {this.props.children}
      </div>
      <Footer />
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    title: 'Admin',
    error: state.app.error,
    internet: (_.has(state.interfaces, 'hardware') && _.has(state.interfaces.hardware, 'internet')) ?
      state.interfaces.hardware.internet
      :
      false
  };
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    load,
    getHardware,
    setError,
  }, dispatch);
  return {
    load: actions.load,
    getHardware: actions.getHardware,
    setError: actions.setError,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
