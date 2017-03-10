import React, { PropTypes } from 'react';

const Hardware = props => (
  <div>
    <h2>Hardware</h2>
    <table className="table table-bordered">
      <tbody>
        <tr>
          <th style={{ width: '20%' }}><code>arch</code></th>
          <td>{props.arch}</td>
        </tr>
        <tr>
          <th><code>internet</code></th>
          <td>{(props.internet) ? 'true' : 'false'}</td>
        </tr>
        <tr>
          <th><code>processor</code></th>
          <td>{props.processor}</td>
        </tr>
        <tr>
          <th><code>system</code></th>
          <td>{props.system}</td>
        </tr>
        <tr>
          <th><code>time</code></th>
          <td>{props.time}</td>
        </tr>
        <tr>
          <th><code>mem</code></th>
          <td>{props.usage.mem}</td>
        </tr>
        <tr>
          <th><code>cpu</code></th>
          <td>
            <ul>
              {props.usage.cpu.map((item, index) =>
                <li key={index}>
                  {item}
                </li>
              )}
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

Hardware.propTypes = {
  arch: PropTypes.string.isRequired,
  internet: PropTypes.bool.isRequired,
  processor: PropTypes.string.isRequired,
  system: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  usage: PropTypes.shape({
    cpu: PropTypes.array.isRequired,
    mem: PropTypes.number.isRequired
  }).isRequired
};

export default Hardware;
