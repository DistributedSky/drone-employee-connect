from flask_restful import Resource, Api, reqparse
from netifaces import ifaddresses, AF_INET
from wireless import Wireless
from docker import from_env
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

    def get(self, iface_id):
        return {'interfaces': {iface_id: ifaddresses(iface_id)[AF_INET]}}

    def post(self, iface_id):
        args = self.parser.parse_args()
        res  = Wireless(iface_id).connect(args['ssid'], args['password'])

        if res:
            db.session.add(WifiSettings(iface_id, args['ssid'], args['password']))
            db.session.commit()

        return {'interfaces': {iface_id: {'ssid': args['ssid'],
                           'password': args['password'],
                           'connected': res}}}

DRONE_EMPLOYEE_DOCKER='scratch'

class Containers(Resource):
    def get(self):
        containers = {}
        for c in from_env().containers():
            link = Link.query.filter_by(short_id=c).first() 
            containers[link.iface_id] = c
        return {'containers': containers}

class Container(Resource):
    def __init__(self):
        self.docker = from_env()
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('iface_id')

    def get(self, iface_id):
        short_id = Link.query.filter_by(iface_id=iface_id).first()
        c = self.docker.get(short_id)
        return {'containers': {iface_id: {short_id: {'status': c.status}}}}

    def post(self, iface_id):
        container = self.docker.run(DRONE_EMPLOYEE_DOCKER, detach=True)
        db.session.add(Link(iface_id, container.short_id))
        db.session.commit()
        return {'containers': {iface_id: {container.short_id: {'status': container.status}}}}

api = Api(app)
api.add_resource(Interfaces, API_PREFIX+'/interfaces')
api.add_resource(Interface,  API_PREFIX+'/interfaces/<iface_id>')
api.add_resource(Containers, API_PREFIX+'/containers')
api.add_resource(Container,  API_PREFIX+'/containers/<iface_id>')
