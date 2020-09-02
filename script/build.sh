#!/usr/bin/env sh
docker build -t 127.0.0.1:5000/react .
docker push 127.0.0.1:5000/react:latest
docker image prune -f