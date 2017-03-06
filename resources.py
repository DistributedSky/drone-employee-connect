from flask_restful import Resource, Api, reqparse
from platform import machine, processor, system
from os import system as system_call
from netifaces import ifaddresses
from wireless import Wireless
from docker import from_env
import psutil, time
from models import *

API_PREFIX = '/api/v1'

class Interfaces(Resource):
  def get(self):
    return {'interfaces': Wireless().interfaces()} 

class Interface(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('ssid')
        self.parser.add_argument('password')

    def get(self, iface):
        return {'interfaces': {
                    iface: ifaddresses(iface)
                }}

    def post(self, iface):
        args = self.parser.parse_args()
        res  = Wireless(iface).connect(args['ssid'], args['password'])

        if res:
            wifi = WifiSettings.query.filter_by(iface=iface).first()
            try:
                wifi.ssid = args['ssid']
                wifi.password = args['password']
            except:
                db.session.add(WifiSettings(iface, args['ssid'], args['password']))
            db.session.commit()

        return {'interfaces': {
                    iface: {
                        'ssid': args['ssid'],
                        'password': args['password'],
                        'connected': res
                    }}}

class Container(Resource):
    def __init__(self):
        self.docker = from_env()
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('image')

    def get(self, iface):
        link = Link.query.filter_by(iface=iface).first()
        if link:
            c = self.docker.containers.get(link.short)
            return {'containers': {
                    iface: {
                        short: {
                            'status': c.status,
                            'image': c.image
                        }}}}
        else:
            return {'error': 'Container not found'}

    def post(self, iface):
        link = Link.query.filter_by(iface=iface).first()
        try:
            c = self.docker.containers.get(link.short_id);
            c.stop()
            c.remove()
            db.session.delete(link)
        except:
            pass

        args = self.parser.parse_args()
        container = self.docker.containers.run('droneemployee/'+args['image'], detach=True)
        db.session.add(Link(iface, container.short_id))
        db.session.commit()
        return {'containers': {
                    iface: {
                        container.short_id: {
                            'status': container.status,
                            'image': args['image']
                        }
                    }}}

class Hardware(Resource):
    def get(self):
        ping_param = "-n 1" if system().lower()=="windows" else "-c 1"
        return {'hardware':
                    { 'processor': processor()
                    , 'system': system()
                    , 'arch': machine()
                    , 'time': time.time()
                    , 'internet': system_call("ping " + ping_param + " github.com") == 0
                    , 'usage': {
                        'cpu': psutil.cpu_percent(interval=1, percpu=True),
                        'mem': psutil.virtual_memory().percent
                    }}}

class Drone(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('battery')
        self.parser.add_argument('signal')
        self.parser.add_argument('stamp')

    def get(self, iface):
        drone = DroneInfo.query.filter_by(iface=iface).first()
        return {'drones':{
                    iface: {
                    'battery': drone.battery,
                    'signal': drone.signal,
                    'stamp': drone.stamp
                    }}}

    def post(self, iface):
        args = self.parser.parse_args()
        db.session.add(DroneInfo(iface, args['battery'], args['signal'], args['stamp']))
        db.session.commit()
        return {'success': True}

api = Api(app)
api.add_resource(Interfaces, API_PREFIX+'/interfaces')
api.add_resource(Interface,  API_PREFIX+'/interfaces/<iface>')
api.add_resource(Container,  API_PREFIX+'/containers/<iface>')
api.add_resource(Drone,      API_PREFIX+'/drones/<iface>')
api.add_resource(Hardware,   API_PREFIX+'/hardware')
