FROM node:20.15

WORKDIR /app
 
COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4173

CMD ["npm","start"]