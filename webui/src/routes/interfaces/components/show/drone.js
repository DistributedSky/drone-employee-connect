import React, { PropTypes } from 'react';

const Drone = props => (
  <div>
    <h2>Drone <button onClick={() => props.getInfo()} className="btn btn-info pull-right">getInfo</button></h2>
    <table className="table table-bordered">
      <tbody>
        <tr>
          <th style={{ width: '20%' }}><code>battery</code></th>
          <td>{props.battery}</td>
        </tr>
        <tr>
          <th><code>signal</code></th>
          <td>{props.signal}</td>
        </tr>
        <tr>
          <th><code>stamp</code></th>
          <td>{props.stamp}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

Drone.propTypes = {
  getInfo: PropTypes.func.isRequired,
  battery: PropTypes.number,
  signal: PropTypes.number,
  stamp: PropTypes.number
};

Drone.defaultProps = {
  battery: 0,
  signal: 0,
  stamp: 0
};

export default Drone;
