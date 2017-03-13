import React, { PropTypes } from 'react';

const Docker = props => (
  <div>
    <div className="pull-right">
      {props.status === '' &&
        <span>...</span>
      }
      {props.status === 'no' &&
        <button onClick={() => props.runDocker(props.name, 'developer')} className="btn btn-info">Run</button>
      }
      {props.status === 'run' &&
        <span className="pull-right">Waiting</span>
      }
      {props.short !== '' &&
        <button onClick={() => props.getStatus(props.name)} className="btn btn-info">getStatus</button>
      }
    </div>
    <h2>Container</h2>
    {props.short !== '' &&
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th style={{ width: '20%' }}><code>short</code></th>
            <td>{props.short}</td>
          </tr>
          <tr>
            <th><code>status</code></th>
            <td>{props.status}</td>
          </tr>
        </tbody>
      </table>
    }
  </div>
);

Docker.propTypes = {
  name: PropTypes.string.isRequired,
  short: PropTypes.string,
  status: PropTypes.string,
  getStatus: PropTypes.func.isRequired,
  runDocker: PropTypes.func.isRequired
};

Docker.defaultProps = {
  short: '',
  status: ''
};

export default Docker;
