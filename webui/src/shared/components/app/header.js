import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Header = function Header(props) {
  return (
    <nav className="navbar navbar-inverse navbar-static-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link to="/" className="navbar-brand">{props.title}</Link>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/">Containers</Link></li>
            <li><Link to="/new">Run</Link></li>
            <li>
              <Link to="/hardware">
                Hardware <span className={props.internet ? 'glyphicon glyphicon-globe text-success' : 'glyphicon glyphicon-globe text-danger'} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  internet: PropTypes.bool
};

Header.defaultProps = {
  internet: false
};

export default Header;
