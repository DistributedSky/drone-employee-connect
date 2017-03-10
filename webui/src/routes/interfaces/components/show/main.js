import React, { PropTypes } from 'react';
import Menu from './menu';
import Info from './info';
import Docker from './docker';
import Hardware from './hardware';
import Drone from './drone';

const Main = props => (
  <div className="row">
    <div className="col-md-3">
      <Menu list={props.list} active={props.name} />
    </div>
    <div className="col-md-9">
      <div className="panel panel-default">
        <div className="panel-body">
          <Info
            {...props.info}
            getInfo={props.getInfo}
            isConnect={props.isConnect}
            connectHadle={props.connectHadle}
          />
          <hr />
          {props.isContainer &&
            <Docker
              name={props.name}
              {...props.container}
              runDocker={props.runDocker}
              getStatus={props.getStatusDocker}
            />
          }
          <hr />
          {props.isDrone &&
            <Drone {...props.drone} getInfo={props.getDrone} />
          }
          <hr />
          {props.isHardware &&
            <Hardware {...props.hardware} />
          }
        </div>
      </div>
    </div>
  </div>
);

Main.propTypes = {
  list: PropTypes.arrayOf(React.PropTypes.object).isRequired,
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
  isContainer: PropTypes.bool,
  getStatusDocker: PropTypes.func.isRequired,
  runDocker: PropTypes.func.isRequired,
  drone: PropTypes.shape({
    battery: PropTypes.number,
    signal: PropTypes.number,
    stamp: PropTypes.number
  }),
  isDrone: PropTypes.bool,
  getDrone: PropTypes.func.isRequired,
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
  }),
  isHardware: PropTypes.bool,
};

Main.defaultProps = {
  info: {},
  container: {},
  drone: {},
  hardware: {},
  isContainer: false,
  isDrone: false,
  isHardware: false,
};

export default Main;
