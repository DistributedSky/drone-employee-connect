from flask_restful import Resource, Api, reqparse
from netifaces import ifaddresses, AF_INET
from wireless import Wireless

class Interfaces(Resource):
  def get(self):
    return {'interfaces': Wireless().interfaces()} 

class Interface(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('ssid')
        self.parser.add_argument('password')

    def get(self, iface_id):
        return {iface_id: ifaddresses(iface_id)[AF_INET]}

    def post(self, iface_id):
        args = parser.parse_args()
        res  = Wireless(iface_id).connect(args['ssid'], args['password'])
        return {iface_id: {'ssid': args['ssid'],
                           'password': args['password'],
                           'connected': res}}
