FROM bitnami/node:14.18.2

COPY . /app

WORKDIR /app

USER root

RUN npm install -g serve

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build"]