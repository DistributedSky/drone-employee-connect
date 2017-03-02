from application import app
from resources import *
from models import *

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')
