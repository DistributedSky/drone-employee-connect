import React, { PropTypes } from 'react';

const Docker = props => (
  <div>
    <h2>
      Container
      {props.status === 'no' &&
        <button onClick={() => props.runDocker(props.name, 'developer')} className="btn btn-info pull-right">Run</button>
      }
      {props.short !== '' &&
        <button onClick={() => props.getStatus(props.name)} className="btn btn-info pull-right">getStatus</button>
      }
    </h2>
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
