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
        names = map(lambda x: x.name, from_env().containers.list())
        return {'containers': list(names)}

    def post(self):
        args = self.parser.parse_args()
        params = json.loads(args['params'])
        env = map(lambda key: key.upper().strip()+'='+params[key].strip(), params)

        network = params['name']+'-net'
        if 'master' in params:
            network = 'container:'+params['master']
        else:
            from_env().networks.create(network, driver='bridge')

        container = from_env().containers.run('droneemployee/'+args['image']+':armhf',
                                              name=params['name'],
                                              network_mode=network,
                                              environment=list(env),
                                              privileged=True,
                                              detach=True)
        container = from_env().containers.get(params['name'])
        if 'wlan' in params:
            iwcall = 'iw phy phy{0} set netns {1}'.format(params['wlan'][-1], container.attrs['State']['Pid'])
            wpacall = 'sh -c "wpa_passphrase {0} {1} > /tmp/wpa.conf"'.format(params['ssid'], params['password'])
            supcall = 'sudo wpa_supplicant -B -i {0} -c /tmp/wpa.conf'.format(params['wlan'])
            print(system_call(iwcall))
            print(container.exec_run(wpacall))
            print(container.exec_run(supcall))
            print(container.exec_run('sudo dhcpcd {0}'.format(params['wlan'])))

        return {'containers': {
                    container.name: {
                        'status': container.status,
                        'image': container.attrs['Config']['Image']
                    }}}

class Container(Resource):
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
            return {'success': True}
        except e:
            return {'success': False, 'error': e}

class ContainerLogs(Resource):
    def get(self, name):
        return {'containers': {
                    name: {
                        'logs': '{0}'.format(from_env().containers.get(name).logs())
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
api.add_resource(Container,     API_PREFIX+'/containers/<name>')
api.add_resource(ContainerLogs, API_PREFIX+'/containers/<name>/logs')
api.add_resource(Hardware,      API_PREFIX+'/hardware')
