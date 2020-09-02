#!/usr/bin/env sh
docker build -t 127.0.0.1:5000/zzf .
docker push 127.0.0.1:5000/zzf:latest
docker image prune -f