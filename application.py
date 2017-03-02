from flask import Flask
from flask_restful import Api
from resources import *

API_PREFIX = '/api/v1'

app = Flask(__name__)
api = Api(app)
api.add_resource(Interfaces, API_PREFIX+'/interfaces')
api.add_resource(Interface,  API_PREFIX+'/interfaces/<iface_id>')
