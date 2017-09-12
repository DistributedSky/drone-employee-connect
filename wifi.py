#!/usr/bin/env python
from os import system as system_call
from docker import from_env
from db import *

def spawn(name, wlan, ssid, password):
    if password == '':
        password = '12345678'
    c = from_env().containers.get(name)
    iwcall ='PHY="phy"`iw dev {0} info | grep wi | grep -Eo ".{{1}}$"`; iw phy $PHY set netns {1}'.format(wlan, c.attrs['State']['Pid'])
    wpacall = 'sh -c "wpa_passphrase {0} {1} > /tmp/wpa.conf"'.format(ssid, password)
    supcall = 'sudo wpa_supplicant -B -i {0} -c /tmp/wpa.conf'.format(wlan)
    print(system_call(iwcall))
    print(c.exec_run(wpacall))
    print(c.exec_run(supcall))
    print(c.exec_run('sudo dhcpcd {0}'.format(wlan)))

import time
time.sleep(30)
if __name__ == '__main__':
    #links = [x[:-1].split(',') for x in open('/etc/dronelinks.csv', 'r')]
    #for name, wlan, ssid, password in links:
    session = Session()
    for instance in session.query(Wlans):    
        try:
            print(instance)
            spawn(instance.name, instance.wlan, instance.ssid, instance.password)
        except:
            print('broken ' + instance.name)
    session.flush()
