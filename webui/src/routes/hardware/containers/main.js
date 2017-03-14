import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Main } from '../components/main';

const ContainerMain = props => (
  <Main {...props.hardware} />
);

ContainerMain.propTypes = {
  hardware: PropTypes.shape({
    arch: PropTypes.string,
    internet: PropTypes.bool,
    processor: PropTypes.string,
    system: PropTypes.string,
    time: PropTypes.number,
    usage: PropTypes.shape({
      cpu: PropTypes.array,
      mem: PropTypes.number
    })
  })
};

ContainerMain.defaultProps = {
  hardware: {}
};

function mapStateToProps(state) {
  return {
    hardware: state.interfaces.hardware
  };
}

export default connect(mapStateToProps)(ContainerMain);
