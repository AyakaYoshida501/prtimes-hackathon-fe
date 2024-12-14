ARG NODE_VERSION=22.12.0
FROM node:${NODE_VERSION}-alpine AS base

FROM base as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN npm install --production
COPY . .
RUN yarn build

FROM base

COPY --from=builder /app/ /

EXPOSE 3000
CMD ["yarn", "start"]
