from flask_restful import Resource, Api, reqparse
from platform import machine, processor, system
from os import system as system_call
from netifaces import interfaces 
from docker import from_env
import psutil, time
from models import *

API_PREFIX = '/api/v1'

class Containers(Resource):
    def __init__(self):
        self.docker = from_env()

    def get(self):
        containerIds = map(lambda x: x.short_id, self.docker.containers.list())
        return {'containers': list(containerIds)} 

class Container(Resource):
    def __init__(self):
        self.docker = from_env()
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('image')
        self.parser.add_argument('ssid')
        self.parser.add_argument('password')

    def get(self, short_id):
        c = self.docker.containers.get(short_id)
        return {'containers': {
                    short_id: {
                        'status': c.status,
                        }}}

    def delete(self, short_id):
        try:
            c = self.docker.containers.get(short_id);
            c.stop()
            c.remove()
            return {'success': True}
        except e:
            return {'success': False, 'error': e}

    def post(self):
        args = self.parser.parse_args()
        container = self.docker.containers.run('droneemployee/'+args['image'],
                                                privileged=True,
                                                detach=True)
        return {'containers': {
                    container.short_id: {
                        'status': container.status
                    }}}

class ContainerLogs(Resource):
    def get(self, short_id):
        return from_env().containers.get(short_id).logs() 

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

class Drone(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('battery')
        self.parser.add_argument('signal')
        self.parser.add_argument('stamp')

    def get(self, short_id):
        drone = DroneInfo.query.filter_by(container=short_id).first()
        return {'drones':{
                    short_id: {
                    'battery': drone.battery,
                    'signal': drone.signal,
                    'stamp': drone.stamp
                    }}}

    def post(self, short_id):
        args = self.parser.parse_args()
        db.session.add(DroneInfo(short_id, args['battery'], args['signal'], args['stamp']))
        db.session.commit()
        return {'success': True}

api = Api(app)
api.add_resource(Containers,    API_PREFIX+'/containers')
api.add_resource(Container,     API_PREFIX+'/containers/<short_id>')
api.add_resource(ContainerLogs, API_PREFIX+'/containers/<short_id>/logs')
api.add_resource(Drone,         API_PREFIX+'/drones/<short_id>')
api.add_resource(Hardware,   API_PREFIX+'/hardware')
