#!/bin/bash
git pull
npm run build
pm2 delete "npm run start"
pm2 start "npm run start"