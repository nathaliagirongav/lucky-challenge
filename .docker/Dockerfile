FROM node:18-alpine as development

WORKDIR /src

COPY package*.json .

RUN npm ci && npm cache clean --force

COPY tsconfig.json .

CMD ["npm", "run", "migrate-and-start"]
