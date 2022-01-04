#!/bin/bash
cd /home/ubuntu/Schedule24-7/server

export MONGO_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names MONGO_HOST --query Parameters[0].Value | sed 's/"//g')
export MONGO_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names MONGO_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export MONGO_USER=$(aws ssm get-parameters --region ap-northeast-2 --names MONGO_USER --query Parameters[0].Value | sed 's/"//g')
export MONGO_DATABASE=$(aws ssm get-parameters --region ap-northeast-2 --names MONGO_DATABASE --query Parameters[0].Value | sed 's/"//g')
export PORT=$(aws ssm get-parameters --region ap-northeast-2 --names PORT --query Parameters[0].Value | sed 's/"//g')
export SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names SECRET --query Parameters[0].Value | sed 's/"//g')
export EMAIL_ADDRESS=$(aws ssm get-parameters --region ap-northeast-2 --names EMIAL_ADDRESS --query Parameters[0].Value | sed 's/"//g')
export EMAIL_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names EMAIL_HOST --query Parameters[0].Value | sed 's/"//g')
export EMAIL_USER=$(aws ssm get-parameters --region ap-northeast-2 --names EMAIL_USER --query Parameters[0].Value | sed 's/"//g')
export EMAIL_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names EMAIL_PASSWORD --query Parameters[0].Value | sed 's/"//g')

export GOOGLE_AUTH_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_AUTH_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_AUTH_CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_AUTH_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')

export KAKAO_AUTH_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_AUTH_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export KAKAO_AUTH_SECRET_ID =$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_AUTH_SECRET_ID --query Parameters[0].Value | sed 's/"//g')

# export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
# export GOOGLE_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
# export GOOGLE_SECRET_ID=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_SECRET_ID --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start dist/main.js
