FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

# RUN npm install -g yarn

RUN yarn install

COPY . .

RUN yarn build

FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

# RUN npm install -g yarn

RUN yarn install --production

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/apps/reservations/main" ]