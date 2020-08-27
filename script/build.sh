#! /bin/sh
npm i
rm -fr .next/*
npm run build
tar -zcvf dist.tar.gz ./.next
tar -zcvf public.tar.gz ./public