#!/usr/bin/env sh
cd /root

# docker部署
docker login --username=cr_temp_user --password=eyJ0aW1lIjoiMTU5ODc2MTU4MDAwMCIsInR5cGUiOiJ1c2VyIiwidXNlcklkIjoiMTM3NTcwNDA5MjE0NjgwOSJ9:8dc891ae8f4c912874b8839f57b03984701bfb19 registry.cn-shanghai.aliyuncs.com
#sudo docker pull registry.cn-shanghai.aliyuncs.com/zzf2001/example-CICD
#docker stop example-CICD
#docker rm example-CICD
#docker run --name=example-CICD -d -p 80:80 registry.cn-shanghai.aliyuncs.com/zzf2001/example-CICD
#docker image prune -f

#利用docker-compose部署
#更新镜像
docker-compose pull
#重新构建方式1
docker-compose up -d --build
#重新构建方式2
#docker-compose up -d --force-recreate

docker image prune -f
