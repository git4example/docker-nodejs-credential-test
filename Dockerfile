#FROM iojs:onbuild

FROM node:14

COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT ["node", "index.js"]
