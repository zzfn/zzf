#!/usr/bin/env sh
npm i
npm run build
docker login --username=cr_temp_user --password=eyJ0aW1lIjoiMTU5ODc2MTU4MDAwMCIsInR5cGUiOiJ1c2VyIiwidXNlcklkIjoiMTM3NTcwNDA5MjE0NjgwOSJ9:8dc891ae8f4c912874b8839f57b03984701bfb19 registry.cn-shanghai.aliyuncs.com
docker build -t registry.cn-shanghai.aliyuncs.com/zzf2001/example_cicd .
docker push registry.cn-shanghai.aliyuncs.com/zzf2001/example_cicd:latest
