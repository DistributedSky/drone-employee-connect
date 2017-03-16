import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Menu = props => (
  <div className="list-group">
    {props.list.map((item, index) =>
      <Link key={index} to={`/containers/${item.name}`} className={(props.active === item.name) ? 'list-group-item active' : 'list-group-item'}>
        {item.name}
      </Link>
    )}
  </div>
);

Menu.propTypes = {
  list: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  active: PropTypes.string
};

Menu.defaultProps = {
  active: ''
};

export default Menu;
