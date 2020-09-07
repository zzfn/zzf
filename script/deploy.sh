#!/usr/bin/env sh

#container_name=zzf
## docker部署
#docker pull registry.docker.annyyy.com/$container_name
#docker stop $container_name
#docker rm $container_name
#docker run --name=$container_name -d -p 9600:9600 registry.docker.annyyy.com/$container_name
#docker image prune -f

#利用docker-compose部署
#更新镜像
#docker-compose pull
#重新构建方式1
#docker-compose up -d --build
#重新构建方式2
#docker-compose up -d --force-recreate

#docker image prune -f
cd /www/wwwroot/zzfzzf.com
git clone https://github.com/nanaouyang/zzf.git
npm i
npm run build
pm2 delete zzf
pm2 start npm --name "zzf" -- start