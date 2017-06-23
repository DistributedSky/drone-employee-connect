from application import *
from resources import *
import os

port = 5000
if 'PORT' in os.environ:
    port = int(os.environ['PORT'])

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=port)
