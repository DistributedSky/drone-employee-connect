#!/usr/bin/env python
from os import system as system_call
from docker import from_env

def spawn(name, wlan, ssid, password):
    c = from_env().containers.get(name)
    iwcall = 'iw phy phy{0} set netns {1}'.format(wlan[-1], c.attrs['State']['Pid'])
    wpacall = 'sh -c "wpa_passphrase {0} {1} > /tmp/wpa.conf"'.format(ssid, password)
    supcall = 'sudo wpa_supplicant -B -i {0} -c /tmp/wpa.conf'.format(wlan)
    print(system_call(iwcall))
    print(c.exec_run(wpacall))
    print(c.exec_run(supcall))
    print(c.exec_run('sudo dhcpcd {0}'.format(wlan)))

if __name__ == '__main__':
    links = [x[:-1].split(',') for x in open('/etc/dronelinks.csv', 'r')]

    for name, wlan, ssid, password in links:
        spawn(name, wlan, ssid, password)
