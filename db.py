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
    wlan = Column(String(30), nullable=False, unique=True)
    ssid = Column(String)
    password = Column(String)

    def __init__(self, name, wlan, ssid, password):
        self.name = name
        self.wlan = wlan
        self.ssid = ssid
        self.password = password
    def __repr__(self):
        return "%s,%s,%s,%s" % (self.name, self.wlan, self.ssid, self.password)
    #def showall(self):
        #for instance in session.query(self).order_by(self.id):
           #print(instance)

engine = create_engine('sqlite:///wlans.db', echo=True)
Session = sessionmaker(bind=engine)
Base.metadata.create_all(engine)
    
def add_wlan(name, wlan, ssid, password):
    session = Session()
    try:
       new_wlan=Wlans(name,wlan,ssid,password)
       session.add(new_wlan)
       session.commit()
       session.flush()
    except:
       print("Oops!  That was no valid wlan.  Try again...")
    
def update_wlan(name,wlan,ssid,password):
    session = Session()
    session.query(Wlans).filter(Wlans.wlan == wlan).update({Wlans.name: name, Wlans.ssid: ssid, Wlans.password: password})
    session.commit()
    session.flush()
    
def check_wlan(name,wlan,ssid,password):
    session = Session()
    new_wlan=Wlans(name,wlan,ssid,password)
    if len(new_wlan.wlan)>=8 and session.query(Wlans.wlan).filter(Wlans.wlan == new_wlan.wlan).all():
       session.flush()
       update_wlan(name,wlan,ssid,password)
    elif len(new_wlan.wlan)>=8:
       session.flush()
       add_wlan(name, wlan, ssid, password)
    
def del_wlan(name):
    session = Session()
    session.query(Wlans).filter(Wlans.name == name).delete()
    session.commit()
    session.flush()        


'''
add_wlan("1","2","3","4")
session = Session()
print session.query(Wlans).all()
if len("12345678") >= 8 and session.query(Wlans.wlan).filter(Wlans.wlan == "2").all():
   print True
else:
   print False
session.flush()
'''

#check_wlan("4","2","3","5")
#print session.query(Wlans).filter(Wlans.wlan == "2").update({Wlans.name: "hui"}, synchronize_session=False)
#del_wlan("Solo-1")
#print session.query(Wlans).all()