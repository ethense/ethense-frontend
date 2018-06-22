FROM node:8.11.2-alpine

ARG API_URL
ENV REACT_APP_API_URL=${API_URL}

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:stable-alpine
COPY ./docker/nginx_vhost.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /app/build /usr/share/nginx/html
