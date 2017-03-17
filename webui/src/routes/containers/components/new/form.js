import React, { PropTypes } from 'react';
import _ from 'lodash';

class Connect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(next) {
    if (!_.isEqual(next.fields, this.props.fields)) {
      const state = {};
      _.forEach(next.fields, (item) => {
        state[item.key] = '';
      });
      this.state = state;
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.props.runDocker(this.props.active, { ...this.state });
    event.preventDefault();
  }

  field(item) {
    if (item.type === 'text') {
      return (
        <div className="form-group">
          <input type="text" name={item.key} value={this.state[item.key]} onChange={this.handleChange} className="form-control" placeholder={item.label} />
        </div>
      );
    } else if (item.type === 'password') {
      return (
        <div className="form-group">
          <input type="password" name={item.key} value={this.state[item.key]} onChange={this.handleChange} className="form-control" placeholder={item.label} />
        </div>
      );
    } else if (item.type === 'wlan') {
      return (
        <div className="form-group">
          <select name={item.key} value={this.state[item.key]} onChange={this.handleChange} className="form-control">
            <option value="">{item.label}</option>
            {this.props.wlans.map((option, index) =>
              <option key={index} value={option}>{option}</option>
            )}
          </select>
        </div>
      );
    } else if (item.type === 'container') {
      return (
        <div className="form-group">
          <select name={item.key} value={this.state[item.key]} onChange={this.handleChange} className="form-control">
            <option value="">{item.label}</option>
            {this.props.containers.map((option, index) =>
              <option key={index} value={option.name}>{option.name}</option>
            )}
          </select>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        {this.props.fields.map((item, index) =>
          <div key={index}>{this.field(item)}</div>
        )}
        {(this.props.newStatus) ? 'run' : <button type="submit" className="btn btn-info">Run</button>}
      </form>
    );
  }
}

Connect.propTypes = {
  active: PropTypes.string,
  fields: PropTypes.array,
  containers: PropTypes.array,
  wlans: PropTypes.array,
  runDocker: PropTypes.func.isRequired,
  newStatus: PropTypes.bool.isRequired
};

Connect.defaultProps = {
  active: '',
  fields: [],
  containers: [],
  wlans: []
};

export default Connect;
