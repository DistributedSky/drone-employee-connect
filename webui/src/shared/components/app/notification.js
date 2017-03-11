import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

export default class Notification extends Component {
  componentWillMount() {
    this.close(this.props.message);
  }

  componentWillUpdate(next) {
    this.close(next.message);
  }

  close(message) {
    const { onClose } = this.props;
    if (!_.isEmpty(message) !== '') {
      setTimeout(onClose, 7000);
    }
  }

  render() {
    return (
      <div>
        {!_.isEmpty(this.props.message) &&
          <div className="alert alert-danger">
              {this.props.message}
          </div>
        }
      </div>
    );
  }
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};
