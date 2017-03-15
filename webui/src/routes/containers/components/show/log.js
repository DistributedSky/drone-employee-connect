import React, { PropTypes } from 'react';

const Log = props => (
  <div className="panel panel-default" style={{ marginTop: 15 }}>
    <div className="panel-heading">
      Logs
      <button onClick={() => props.getLog()} className="btn btn-info btn-xs pull-right">update</button>
    </div>
    <div className="panel-body">
      <div dangerouslySetInnerHTML={{ __html: props.text }} />
    </div>
  </div>
);

Log.propTypes = {
  text: PropTypes.string,
  getLog: PropTypes.func.isRequired
};

Log.defaultProps = {
  text: ''
};

export default Log;
