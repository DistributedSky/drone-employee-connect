from flask_restful import Resource, Api, reqparse
from netifaces import ifaddresses, AF_INET
from wireless import Wireless
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

api = Api(app)
api.add_resource(Interfaces, API_PREFIX+'/interfaces')
api.add_resource(Interface,  API_PREFIX+'/interfaces/<iface_id>')
