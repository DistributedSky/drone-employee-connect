import React, { PropTypes } from 'react';

class Connect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ssid: '',
      password: '',
      wlan: '',
      master: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.props.runDocker(this.state.ssid, this.state.password, this.state.wlan, this.state.master);
    event.preventDefault();
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="text" name="ssid" value={this.state.ssid} onChange={this.handleChange} className="form-control" placeholder="ssid" />
        </div>
        <div className="form-group">
          <input type="text" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" placeholder="password" />
        </div>
        <div className="form-group">
          <select name="wlan" value={this.state.wlan} onChange={this.handleChange} className="form-control">
            {this.props.wlans.map((item, index) =>
              <option key={index} value={item}>{item}</option>
            )}
          </select>
        </div>
        <div className="form-group">
          <select name="master" value={this.state.master} onChange={this.handleChange} className="form-control">
            {this.props.containers.map((item, index) =>
              <option key={index} value={item.name}>{item.name}</option>
            )}
          </select>
        </div>
        {(this.props.newStatus) ? 'run' : <button type="submit" className="btn btn-info">Run</button>}
      </form>
    );
  }
}

Connect.propTypes = {
  containers: PropTypes.array,
  wlans: PropTypes.array,
  runDocker: PropTypes.func.isRequired,
  newStatus: PropTypes.bool.isRequired
};

Connect.defaultProps = {
  containers: [],
  wlans: []
};

export default Connect;
