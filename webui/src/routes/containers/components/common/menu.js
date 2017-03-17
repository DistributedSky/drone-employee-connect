import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Menu = props => (
  <div className="list-group">
    {props.list.map((item, index) =>
      <Link key={index} to={`/modules/${item.name}`} className={(props.active === item.name) ? 'list-group-item active clearfix' : 'list-group-item clearfix'}>
        {item.name}
        <span className="pull-right">
          <button className="btn btn-xs btn-warning" onClick={() => props.onRemove(item.name)}>
            <span className="glyphicon glyphicon-trash" />
          </button>
        </span>
      </Link>
    )}
  </div>
);

Menu.propTypes = {
  list: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onRemove: PropTypes.func.isRequired,
  active: PropTypes.string,
};

Menu.defaultProps = {
  active: ''
};

export default Menu;
