import Promise from 'bluebird';

// let connect = false;
// let docker = false;

export const post = (url) => {
  let response;
  if (url === '/containers') {
    response = {
      containers: {
        '2f44230ab5': {
          status: 'running'
        }
      }
    };
    // docker = true;
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve(response), 2000);
  });
};

export const get = (url) => {
  let response;
  if (url === '/containers') {
    response = {
      containers: [
        '2f44230ab5'
      ]
    };
    // if (docker) {
    //   response = {
    //     containers: [
    //       '2f44230ab5'
    //     ]
    //   };
    // } else {
    //   response = {
    //     containers: []
    //   };
    // }
  } else if (url === '/containers/2f44230ab5') {
    response = {
      containers: {
        '2f44230ab5': {
          status: 'running'
        }
      }
    };
  } else if (url === '/containers/2f44230ab5/logs') {
    response = {
      containers: {
        '2f44230ab5': {
          logs: "b'\\x1b]0;root@81227f9dea15: /\\x07root@81227f9dea15:/# \\r\\x1b[K\\x1b]0;root@81227f9dea15: /\\x07root@81227f9dea15:/# \\r\\n\\x1b]0;root@81227f9dea15: /\\x07root@81227f9dea15:/# assd\\r\\nbash: assd: command not found\\r\\n'"
        }
      }
    };
  } else if (url === '/hardware') {
    response = {
      hardware: {
        arch: 'x86_64',
        internet: true,
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
        },
        wlans: [
          'wlan0'
        ]
      }
    };
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve(response), 2000);
  });
};
