from flask_restful import Resource, Api, reqparse
from platform import machine, processor, system
from os import system as system_call
from netifaces import interfaces 
from docker import from_env
from application import app
import psutil, time, json, wifi, sqlite3
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

API_PREFIX = '/api/v1'

class Containers(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('image')
        self.parser.add_argument('params')

    def get(self):
        names = map(lambda x: x.name, from_env().containers.list(all=True))
        return {'containers': list(names)}

    def post(self):
        args = self.parser.parse_args()
        params = json.loads(args['params'])
        env = map(lambda key: key.upper().strip()+'='+params[key].strip(), params)

        network = params['name']+'-net'
        if 'master' in params:
            network = params['master']+'-net'
        else:
            from_env().networks.create(network, driver='bridge')

        container = from_env().containers.run('droneemployee/'+args['image']+':armhf',
                                              name=params['name'],
                                              network=network,
                                              environment=list(env),
                                              privileged=True,
                                              detach=True,
					      restart_policy={"Name":"always"}
					      )

        if 'wlan' in params:
             engine = create_engine('sqlite:///wlans.db', echo=True)
             Session = sessionmaker(bind=engine)
             session = Session()
             Base.metadata.create_all(engine)
             wlan_new = Wlans(params['name'],params['wlan'],params['ssid'],params['password'])
             print(wlan_new.id)
             for instance in session.query(Wlans).order_by(Wlans.id): 
                 if instance.wlan == wlan_new.wlan:
                      print(instance)
                      session.delete(instance)
             session.add(wlan_new)
             session.commit()

             #with open('/etc/dronelinks.csv', 'a') as links:
                 #links.write('{0},{1},{2},{3}\n'.format(params['name'],params['wlan'],params['ssid'],params['password']))

             wifi.spawn(params['name'],params['wlan'],params['ssid'],params['password'])
        return {'containers': {
                    container.name: {
                        'status': container.status,
                        'image': container.attrs['Config']['Image']
                    }}}

class Container(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('cmd')

    def get(self, name):
        c = from_env().containers.get(name)
        return {'containers': {
                    name: {
                        'status': c.status,
                        'image': c.attrs['Config']['Image']
                        }}}

    def delete(self, name):
        try:
            c = from_env().containers.get(name)
            c.remove(force=True)

            if name+'-net' in from_env().networks.list():
                n = from_env().networks.get(name+'-net')
                n.remove()
        except:
            return {'success': False}

        return {'success': True}

    def post(self, name):
        args = self.parser.parse_args()
        c = from_env().containers.get(name)
        if args['cmd'] == 'logs':
            return {'containers': {name: { 'logs': '{0}'.format(c.logs()) }}}
        elif args['cmd'] == 'restart':
            return {'containers': {name: { 'restart': '{0}'.format(c.restart()) }}}
        else:
            return {'success': False}

class Hardware(Resource):
    def get(self):
        ping_param = "-n 1" if system().lower()=="windows" else "-c 1"
        hasInternet = system_call("ping " + ping_param + " github.com") == 0
        wlans = filter(lambda x: x.startswith('wlan'), interfaces())
        return {'hardware':
                    { 'system': system()
                    , 'arch': machine()
                    , 'time': time.time()
                    , 'internet': hasInternet 
                    , 'wlans': list(wlans) 
                    , 'usage': {
                        'cpu': psutil.cpu_percent(interval=1, percpu=True),
                        'mem': psutil.virtual_memory().percent
                    }}}




api = Api(app)
api.add_resource(Containers, API_PREFIX+'/containers')
api.add_resource(Container,  API_PREFIX+'/containers/<name>')
api.add_resource(Hardware,   API_PREFIX+'/hardware')
