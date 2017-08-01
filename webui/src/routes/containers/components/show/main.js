import React, { PropTypes } from 'react';
import Log from './log';

const Main = props => (
  <div>
    {props.status === '' &&
      <span>...</span>
    }
    {props.status === 'run' &&
      <span className="pull-right">Waiting</span>
    }
    {(props.status !== '' && props.status !== 'no' && props.status !== 'run') &&
      <div>
        <div className="btn-group pull-right">
          <button onClick={() => props.getStatusDocker(props.name)} className="btn btn-info btn-xs">getStatus</button>
          <button onClick={() => props.onRestart(props.name)} className="btn btn-warning btn-xs">restart</button>
          <button className="btn btn-xs btn-danger" onClick={() => props.onRemove(props.name)}>
            <span className="glyphicon glyphicon-trash" />
          </button>
        </div>
        <p>Status: <b>{props.status}</b></p>
      </div>
    }
    <hr />
    <Log text={props.log} getLog={props.getLog} />
  </div>
);

Main.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string,
  log: PropTypes.string,
  getStatusDocker: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired,
  getLog: PropTypes.func.isRequired
};

Main.defaultProps = {
  status: '',
  log: ''
};

export default Main;
