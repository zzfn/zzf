#! /bin/sh
cd /www/wwwroot/zzfzzf.com
npm i --production
rm -fr .next/*
rm -fr public/*
tar -zxvf dist.tar.gz
tar -zxvf public.tar.gz
pm2 delete zzf
pm2 start npm --name "zzf" --  run  start
rm -fr dist.tar.gz
rm -fr public.tar.gz