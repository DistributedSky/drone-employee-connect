all: venv
	. venv/bin/activate && python serve.py

DEPS=flask-restful flask-sqlalchemy wireless netifaces docker-py psutil

venv:
	virtualenv --python=python3 venv
	. venv/bin/activate && pip install ${DEPS}

clean:
	rm -rf *.pyc venv __pycache__
