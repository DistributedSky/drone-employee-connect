import React, { PropTypes } from 'react';

const Main = props => (
  <div className="row">
    <div className="col-md-12">
      <div className="panel panel-default">
        <div className="panel-body">
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
              <tr>
                <th><code>wlans</code></th>
                <td>
                  <ul>
                    {props.wlans.map((item, index) =>
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
      </div>
    </div>
  </div>
);

Main.propTypes = {
  arch: PropTypes.string,
  internet: PropTypes.bool,
  system: PropTypes.string,
  time: PropTypes.number,
  usage: PropTypes.shape({
    cpu: PropTypes.array,
    mem: PropTypes.number
  }),
  wlans: PropTypes.array
};

Main.defaultProps = {
  arch: '',
  internet: false,
  system: '',
  time: 0,
  usage: {
    cpu: [],
    mem: 0
  },
  wlans: []
};

export default Main;
