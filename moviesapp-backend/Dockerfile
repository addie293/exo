FROM bitnami/node:14.18.2

COPY . /app

WORKDIR /app

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]