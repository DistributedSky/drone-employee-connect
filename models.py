from flask_sqlalchemy import SQLAlchemy
from application import app

db = SQLAlchemy(app)
db.create_all()

class WifiSettings(db.Model):
    id       = db.Column(db.Integer, primary_key=True)
    iface    = db.Column(db.String(80), unique=True)
    ssid     = db.Column(db.String(120))
    password = db.Column(db.String(120))

    def __init__(self, iface, ssid, password):
        self.iface    = username
        self.ssid     = ssid
        self.password = password

    def __repr__(self):
        return '<WifiSettings %r>' % self.iface
