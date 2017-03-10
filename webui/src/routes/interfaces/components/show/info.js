import React, { PropTypes } from 'react';
import Connect from './connect';

const Info = props => (
  <div>
    <div className="pull-right">
      {props.isConnect ?
        <p>
          <span className="label label-success">Connect</span>&nbsp;
          <button onClick={() => props.getInfo()} className="btn btn-info btn-sm">getInfo</button>
        </p>
        :
        <Connect connectHadle={props.connectHadle} />
      }
    </div>
    <h2>Interface</h2>
    {props.isConnect &&
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th style={{ width: '20%' }}><code>addr</code></th>
            <td>{props.addr}</td>
          </tr>
          <tr>
            <th><code>broadcast</code></th>
            <td>{props.broadcast}</td>
          </tr>
          <tr>
            <th><code>netmask</code></th>
            <td>{props.netmask}</td>
          </tr>
        </tbody>
      </table>
    }
  </div>
);

Info.propTypes = {
  getInfo: PropTypes.func.isRequired,
  addr: PropTypes.string.isRequired,
  broadcast: PropTypes.string.isRequired,
  netmask: PropTypes.string.isRequired,
  isConnect: PropTypes.bool.isRequired,
  connectHadle: PropTypes.func.isRequired,
};

Info.defaultProps = {
  addr: '',
  broadcast: '',
  netmask: ''
};

export default Info;
