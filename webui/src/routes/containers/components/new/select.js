import React, { PropTypes } from 'react';

class Connect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.props.setActive(event.target.value);
  }

  render() {
    return (
      <form className="form">
        <div className="form-group">
          <select name="active" value={this.state.active} onChange={this.handleChange} className="form-control">
            <option value="">---</option>
            {this.props.list.map((item, index) =>
              <option key={index} value={item}>{item}</option>
            )}
          </select>
        </div>
      </form>
    );
  }
}

Connect.propTypes = {
  active: PropTypes.string,
  list: PropTypes.array,
  setActive: PropTypes.func.isRequired
};

Connect.defaultProps = {
  active: '',
  list: []
};

export default Connect;
