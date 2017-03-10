import React, { PropTypes } from 'react';
import Menu from './menu';

const Main = props => (
  <div className="row">
    <div className="col-md-3">
      <Menu list={props.list} active={''} />
    </div>
    <div className="col-md-9">
      <div className="panel panel-default">
        <div className="panel-body">Выберите интерфейс</div>
      </div>
    </div>
  </div>
);

Main.propTypes = {
  list: PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export default Main;
