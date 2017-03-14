from flask_sqlalchemy import SQLAlchemy
from application import app

db = SQLAlchemy(app)

class DroneInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    container = db.Column(db.String(20), unique=True)
    battery   = db.Column(db.Integer)
    signal    = db.Column(db.Integer)
    stamp     = db.Column(db.Integer)

    def __init__(self, container, battery, signal, stamp):
        self.container = iface
        self.battery   = battery
        self.signal    = signal
        self.stamp     = stamp

    def __repr__(self):
        return '<Drone %r>'.format(self.container)
