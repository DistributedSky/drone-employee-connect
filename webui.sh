#!/bin/sh
cd /home/pi/drone-employee-connect && . venv/bin/activate && PORT=80 python serve.py
