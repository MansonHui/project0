# FROM node:18
# RUN npm install -g npm@10.8.1
# RUN npm install -g --force yarn
# EXPOSE 8080


FROM node:lts
WORKDIR /usr/src/app
COPY . .
EXPOSE 8080
CMD export NODE_OPTIONS="--max-old-space-size=5120" && \
    yarn install && \
    yarn setup && \
    yarn start