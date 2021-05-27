#/bin/bash

cd /home/xen/basic-crud-express
rm -rf __tests__ routes scripts .env .gitignore appspec.yml models.js package.json package-lock.json README.md server.js
sudo chown -R xen:xen /home/xen/basic-crud-express/*
