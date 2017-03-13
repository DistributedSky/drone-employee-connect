import React, { PropTypes } from 'react';
import Info from './info';
import Docker from './docker';
import Drone from './drone';

const Main = props => (
  <div>
    <Info
      {...props.info}
      isConnect={props.isConnect}
      getInfo={props.getInfo}
      connectHadle={props.connectHadle}
    />
    <hr />
    <Docker
      name={props.name}
      {...props.container}
      runDocker={props.runDocker}
      getStatus={props.getStatusDocker}
    />
    <hr />
    <Drone {...props.drone} getInfo={props.getDrone} />
  </div>
);

Main.propTypes = {
  name: PropTypes.string.isRequired,
  isConnect: PropTypes.bool.isRequired,
  connectHadle: PropTypes.func.isRequired,
  info: PropTypes.shape({
    addr: PropTypes.string,
    broadcast: PropTypes.string,
    netmask: PropTypes.string
  }),
  getInfo: PropTypes.func.isRequired,
  container: PropTypes.shape({
    short: PropTypes.string,
    status: PropTypes.string
  }),
  getStatusDocker: PropTypes.func.isRequired,
  runDocker: PropTypes.func.isRequired,
  drone: PropTypes.shape({
    battery: PropTypes.number,
    signal: PropTypes.number,
    stamp: PropTypes.number
  }),
  getDrone: PropTypes.func.isRequired
};

Main.defaultProps = {
  info: {},
  container: {},
  drone: {}
};

export default Main;
