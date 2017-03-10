import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/app/header';
import Footer from '../components/app/footer';

import './style.css';

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired
  };

  componentWillMount() {
    console.log(this);
  }

  render() {
    return (<div>
      <Header title={this.props.title} />
      <div className="container">
        {this.props.children}
      </div>
      <Footer />
    </div>);
  }
}

function mapStateToProps() {
  return {
    title: 'Admin'
  };
}

export default connect(mapStateToProps)(App);
