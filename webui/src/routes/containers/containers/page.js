import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Menu } from '../components/common';
import { load } from '../../../modules/interfaces/actions';

const ContainerPage = props => (
  <div>
    <h1>
      Modules
      <div className="btn-group pull-right">
        <Link to="/new" className="btn btn-info"><span className="glyphicon glyphicon-plus" /></Link>
        <button onClick={() => props.load()} className="btn btn-info"><span className="glyphicon glyphicon-refresh" /></button>
      </div>
    </h1>
    <hr />
    <div className="row">
      <div className="col-md-3">
        <Menu {...props.menu} />
      </div>
      <div className="col-md-9">
        <div className="panel panel-default">
          <div className="panel-body">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  </div>
);

ContainerPage.propTypes = {
  children: PropTypes.element.isRequired,
  menu: PropTypes.shape({
    list: PropTypes.arrayOf(React.PropTypes.object).isRequired,
    active: PropTypes.string
  }).isRequired,
  load: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  return {
    menu: {
      active: props.params.name,
      list: state.interfaces.list
    }
  };
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    load
  }, dispatch);
  return {
    load: actions.load
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerPage);
