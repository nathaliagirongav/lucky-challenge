FROM node:18 as development

WORKDIR /src

COPY package*.json ./

RUN npm ci && npm cache clean --force

RUN npm install

COPY . ./

CMD ["npm", "run", "start:dev"]
