from flask import Flask

app = Flask(__name__, static_url_path='/static')

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///settings.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/<path:path>')
def static_file(path):
        return app.send_static_file(path)
