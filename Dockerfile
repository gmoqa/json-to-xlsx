FROM node:10-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=3000
ENV HOST=localhost
EXPOSE 3000
CMD ["npm", "start"]
