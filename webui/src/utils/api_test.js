import Promise from 'bluebird';

let connect = false;
let docker = false;

export const post = (url) => {
  let response;
  if (url === '/interfaces/wlan0') {
    response = {
      interfaces: {
        wlan0: {
          connected: true,
          password: '1234567890',
          ssid: 'myssid'
        }
      }
    };
    connect = true;
  } else if (url === '/containers/wlan0') {
    response = {
      containers: {
        wlan0: {
          1231231231: {
            status: 'created'
          }
        }
      }
    };
    docker = true;
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve(response), 2000);
  });
};

export const get = (url) => {
  let response;
  if (url === '/interfaces') {
    response = {
      interfaces: [
        'wlan0',
        'wlan1'
      ]
    };
  } else if (url === '/interfaces/wlan0') {
    if (connect) {
      response = {
        interfaces: {
          wlan0: {
            2: [{
              addr: '192.168.5.1',
              broadcast: '192.168.5.255',
              netmask: '255.255.255.0'
            }],
            17: [{
              broadcast: '123',
              netmask: '234'
            }]
          }
        }
      };
    } else {
      response = {
        interfaces: {
          wlan0: {
            17: [{
              broadcast: '123',
              netmask: '234'
            }]
          }
        }
      };
    }
  } else if (url === '/containers/wlan0') {
    if (docker) {
      response = {
        containers: {
          wlan0: {
            1231231231: {
              status: 'running'
            }
          }
        }
      };
    } else {
      response = {
        error: 'd'
      };
    }
  } else if (url === '/drones/wlan0') {
    response = {
      drones: {
        wlan0: {
          battery: 73,
          signal: 80,
          stamp: 33213321
        }
      }
    };
  } else if (url === '/hardware') {
    response = {
      hardware: {
        arch: 'x86_64',
        internet: true,
        processor: 'Intel(R) Core(TM) i3-3110M CPU @ 2.40GHz',
        system: 'Linux',
        time: 1488786523.0755541,
        usage: {
          cpu: [
            4.0,
            2.0,
            4.0,
            3.0
          ],
          mem: 27.5
        }
      }
    };
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve(response), 2000);
  });
};
