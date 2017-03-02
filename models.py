from flask_sqlalchemy import SQLAlchemy
from application import app

db = SQLAlchemy(app)

class WifiSettings(db.Model):
    id       = db.Column(db.Integer, primary_key=True)
    iface_id = db.Column(db.String(80), unique=True)
    ssid     = db.Column(db.String(120))
    password = db.Column(db.String(120))

    def __init__(self, iface_id, ssid, password):
        self.iface_id = iface_id
        self.ssid     = ssid
        self.password = password

    def __repr__(self):
        return '<WifiSettings %r>'.format(self.iface_id)

class Link(db.Model):
    id       = db.Column(db.Integer, primary_key=True)
    iface_id = db.Column(db.String(80), unique=True)
    short_id = db.Column(db.String(80), unique=True)

    def __init__(self, iface_id, short_id):
        self.iface_id = iface_id
        self.short_id = short_id

    def __repr__(self):
        return '<Link %r %r>'.format(self.iface_id, self.short_id)
