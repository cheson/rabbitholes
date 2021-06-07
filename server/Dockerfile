FROM node:14.17.0

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN ["yarn", "install", "--pure-lockfile"]

COPY . .

CMD ["npm", "start"]