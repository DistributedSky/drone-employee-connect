import React, { PropTypes } from 'react';

class Connect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ssid: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.props.connectHadle(this.state.ssid, this.state.password);
    event.preventDefault();
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="text" name="ssid" value={this.state.ssid} onChange={this.handleChange} className="form-control" placeholder="ssid" />&nbsp;
        </div>
        <div className="form-group">
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" placeholder="password" />&nbsp;
        </div>
        <button type="submit" className="btn btn-info">Connect</button>
      </form>
    );
  }
}

Connect.propTypes = {
  connectHadle: PropTypes.func.isRequired
};

export default Connect;
