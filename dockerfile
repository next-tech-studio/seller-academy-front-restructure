FROM node:18 AS build
ARG USE_IRANREPO
ENV DOCKER 1

COPY package*.json /app/
WORKDIR /app
# RUN npm set registry https://npm.iranrepo.ir
RUN npm install -g pnpm
# RUN pnpm i --prefer-offline -P
RUN pnpm run build

ARG API_BASE_URL
ARG APP_NAME
ARG PUBLIC_SITE_URL
ARG SELLER_PANEL_LOGIN_URL

COPY ./core /app/core

ARG MODULE

COPY ./${MODULE} /app/${MODULE}
WORKDIR /app/${MODULE}

EXPOSE 3000
ADD https://github.com/krallin/tini/releases/download/v0.19.0/tini /tini
RUN chmod +x /tini
WORKDIR /app/${MODULE}
ENTRYPOINT ["/tini", "--", "node", ".output/server/index.mjs"]
