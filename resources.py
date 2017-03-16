from flask_restful import Resource, Api, reqparse
from platform import machine, processor, system
from os import system as system_call
from netifaces import interfaces 
from docker import from_env
from application import app
import psutil, time, json

API_PREFIX = '/api/v1'

class Containers(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('image')
        self.parser.add_argument('params')

    def get(self):
        containerIds = map(lambda x: x.short_id, from_env().containers.list())
        return {'containers': list(containerIds)} 

    def post(self):
        args = self.parser.parse_args()
        params = json.loads(args['params'])
        env = map(lambda key: key.upper()+'='+params[key], params)
        container = from_env().containers.run('droneemployee/'+args['image'],
                                              environment=list(env),
                                              privileged=True,
                                              detach=True)
        return {'containers': {
                    container.short_id: {
                        'status': container.status,
                        'image': container.attrs['Config']['Image']
                    }}}

class Container(Resource):
    def get(self, short_id):
        c = from_env().containers.get(short_id)
        return {'containers': {
                    short_id: {
                        'status': c.status,
                        'image': c.attrs['Config']['Image']
                        }}}

    def delete(self, short_id):
        try:
            c = from_env().containers.get(short_id);
            c.stop()
            c.remove()
            return {'success': True}
        except e:
            return {'success': False, 'error': e}

class ContainerLogs(Resource):
    def get(self, short_id):
        return {'containers': {
                    short_id: {
                        'logs': '{0}'.format(from_env().containers.get(short_id).logs())
                        }}}

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
api.add_resource(Containers,    API_PREFIX+'/containers')
api.add_resource(Container,     API_PREFIX+'/containers/<short_id>')
api.add_resource(ContainerLogs, API_PREFIX+'/containers/<short_id>/logs')
api.add_resource(Hardware,      API_PREFIX+'/hardware')
