FROM node:16-alpine

WORKDIR /app
COPY pack*.json ./
RUN npm install
# RUN npm install -g pm2
#RUN apt-get update -y
#RUN apt-get install -y authbind
ENV MONGO_HOST=${MONGO_BASE} \
  MONGO_PASSWORD=${MONGO_PASSWORD} \
  MONGO_USER=${MONGO_USER} \
  MONGO_DATABASE=${MONGO_DATABASE} \
  PORT=${PORT} \
  SECRET=${SECRET} \
  EMAIL_ADDRESS=${EMAIL_ADDRESS} \
  EMAIL_HOST=${EMAIL_HOST} \
  EMAIL_USER=${EMAIL_USER} \
  EMAIL_PASSWORD=${EMAIL_PASSWORD} \
  GOOGLE_AUTH_CLIENT_ID=${GOOGLE_AUTH_CLIENT_ID} \
  GOOGLE_AUTH_CLIENT_SECRET=${GOOGLE_AUTH_CLIENT_SECRET}


COPY . .
EXPOSE 80
RUN npm run build
CMD ["node","dist/main.js"]






# # Step 1
# ## base image for Step 1: Node 10
# FROM node:16 AS builder
# WORKDIR /app
# ## 프로젝트의 모든 파일을 WORKDIR(/app)로 복사한다
# COPY . .
# ## Nest.js project를 build 한다
# RUN npm install --force
# RUN npm run build


# # Step 2
# ## base image for Step 2: Node 10-alpine(light weight)
# FROM node:16-alpine
# WORKDIR /app
# ## Step 1의 builder에서 build된 프로젝트를 가져온다
# COPY --from=builder /app ./
# ## application 실행
# CMD ["npm", "run", "start:prod"]