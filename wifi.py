#!/usr/bin/env python
from os import system as system_call
from docker import from_env
from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey
from sqlalchemy.orm import mapper
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Wlans(Base):
    __tablename__ = 'wlanstb'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    wlan = Column(String)
    ssid = Column(String)
    password = Column(String)

    def __init__(self, name, wlan, ssid, password):
        self.name = name
        self.wlan = wlan
        self.ssid = ssid
        self.password = password
    def __repr__(self):
        return "<User('%s','%s','%s','%s')>" % (self.name, self.wlan, self.ssid, self.password)

def spawn(name, wlan, ssid, password):
    c = from_env().containers.get(name)
    iwcall ='PHY="phy"`iw dev {0} info | grep wi | grep -Eo ".{{1}}$"`; iw phy $PHY set netns {1}'.format(wlan, c.attrs['State']['Pid'])
    wpacall = 'sh -c "wpa_passphrase {0} {1} > /tmp/wpa.conf"'.format(ssid, password)
    supcall = 'sudo wpa_supplicant -B -i {0} -c /tmp/wpa.conf'.format(wlan)
    print(system_call(iwcall))
    print(c.exec_run(wpacall))
    print(c.exec_run(supcall))
    print(c.exec_run('sudo dhcpcd {0}'.format(wlan)))

import time
if __name__ == '__main__':
    #links = [x[:-1].split(',') for x in open('/etc/dronelinks.csv', 'r')]
    
    engine = create_engine('sqlite:///wlans.db', echo=True)
    Session = sessionmaker(bind=engine)
    session = Session()
    Base.metadata.create_all(engine)
    time.sleep(30)
    #for name, wlan, ssid, password in links:
    for instance in session.query(Wlans).order_by(Wlans.id):    
        try:
            spawn(instance.name, instance.wlan, instance.ssid, instance.password)
        except:
            print('broken ' + instance.name)
