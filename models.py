from flask_sqlalchemy import SQLAlchemy
from application import app

db = SQLAlchemy(app)

class WifiSettings(db.Model):
    id       = db.Column(db.Integer, primary_key=True)
    iface    = db.Column(db.String(20), unique=True)
    ssid     = db.Column(db.String(120))
    password = db.Column(db.String(120))

    def __init__(self, iface, ssid, password):
        self.iface    = iface
        self.ssid     = ssid
        self.password = password

    def __repr__(self):
        return '<WifiSettings %r>'.format(self.iface_id)

class Link(db.Model):
    id    = db.Column(db.Integer, primary_key=True)
    iface = db.Column(db.String(20), unique=True)
    short = db.Column(db.String(20), unique=True)

    def __init__(self, iface, short):
        self.iface = iface
        self.short = short

    def __repr__(self):
        return '<Link %r %r>'.format(self.iface, self.short)

class DroneInfo(db.Model):
    id      = db.Column(db.Integer, primary_key=True)
    iface   = db.Column(db.String(20), unique=True)
    battery = db.Column(db.Integer)
    signal  = db.Column(db.Integer)
    stamp   = db.Column(db.Integer)

    def __init__(self, iface, battery, signal, stamp):
        self.iface   = iface
        self.battery = battery
        self.signal  = signal
        self.stamp   = stamp

    def __repr__(self):
        return '<Drone %r>'.format(self.iface)
